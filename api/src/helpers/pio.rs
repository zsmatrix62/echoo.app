use std::{
    error::Error,
    io::{
        BufReader,
        Read,
        Write,
    },
    os::unix::prelude::PermissionsExt,
    path::{
        Path,
        PathBuf,
    },
};

use assert_cmd::Command;
use tempfile::tempdir;

/// Compress an image file by input file path
fn compress_image_file<T>(source_file: &T, quality: u32, target_file: &T) -> Result<(), Box<dyn Error>>
where
    T: AsRef<Path>,
{
    let output = Command::new("pio")
        .arg(source_file.as_ref().to_str().unwrap())
        .arg("--quality")
        .arg(format!("{}", quality))
        .arg("-o")
        .arg(target_file.as_ref().to_str().unwrap())
        .output()?;

    println!("{:?}", output);
    if !output.status.success() {
        let err_msg = match std::str::from_utf8(&output.stderr) {
            Ok(v) => v,
            Err(_) => "compressing error",
        };
        Err(err_msg.into())
    } else {
        Ok(())
    }
}

/// Get built-in pio path - returns system build-in path if already exits, otherwise echoo default
/// exe dir
pub(crate) fn get_pio_binary() -> PathBuf {
    let pio_path = if Command::new("pio").arg("-V").ok().is_ok() {
        let output = Command::new("which").arg("pio").output().unwrap();
        let s = match std::str::from_utf8(&output.stdout) {
            Ok(v) => v.trim_end(),
            Err(_) => "",
        };
        s.into()
    } else {
        match dirs::data_local_dir() {
            Some(v) => {
                let echoo_dir = v.join("echoo");
                let _ = std::fs::create_dir_all(&echoo_dir);
                echoo_dir.join("pio")
            }
            None => "error pio binary".into(),
        }
    };
    println!(">> use pio executable: {:?}", pio_path);
    pio_path
}

pub(crate) struct CompressImageFileOut {
    pub bytes: Box<[u8]>, // bytes
    pub i_size: u64,      // input size
    pub o_size: u64,      // output size
    pub reduced: f64,     // reduced ratio
}

pub(crate) fn compress_image_file_bytes(
    input: &[u8],
    format: &str,
    quality: u32,
) -> Result<CompressImageFileOut, Box<dyn Error>> {
    let dir = tempdir().unwrap();
    let target_dir = dir.path();
    let input_file = target_dir.join(format!("echoo_compress_i.{}", format));
    let mut input_file_obj = std::fs::File::create(&input_file)?;
    input_file_obj.write_all(input)?;

    let output_file = target_dir.join(format!("echoo_compress_o.{}", format));

    compress_image_file(&input_file, quality, &output_file)?;

    let out_file_obj = std::fs::File::open(output_file)?;
    let mut reader = BufReader::new(&out_file_obj);
    let mut buffer = Vec::new();
    reader.read_to_end(&mut buffer)?;

    let i_size = input_file_obj.metadata().unwrap().len();
    let o_size = out_file_obj.metadata().unwrap().len();

    std::fs::remove_dir_all(target_dir);
    let reduced: f64 = (i_size as f64 - o_size as f64) / i_size as f64;

    Ok(CompressImageFileOut {
        bytes: buffer.into(),
        i_size,
        o_size,
        reduced,
    })
}

/// Try PIO binary command and return validation
pub(crate) fn try_pio() -> bool {
    let exe = get_pio_binary();
    Command::new(format!("{}", exe.to_str().unwrap()))
        .arg("-V")
        .ok()
        .is_ok()
}

pub(crate) async fn download_pio_bin() -> Result<(), Box<dyn Error>> {
    let exe = get_pio_binary();
    #[cfg(target_os = "windows")]
    let url: &str = "https://github.com/zsmatrix62/pio-bins/raw/main/win/pio";

    #[cfg(target_os = "macos")]
    let url: &str = "https://github.com/zsmatrix62/pio-bins/raw/main/mac/pio";

    #[cfg(target_os = "linux")]
    let url: &str = "https://github.com/zsmatrix62/pio-bins/raw/main/linux/pio";

    let response = reqwest::get(url).await?;
    let mut file = std::fs::File::create(&exe)?;
    file.write_all(&response.bytes().await?);

    #[cfg(target_family = "unix")]
    std::fs::set_permissions(exe, std::fs::Permissions::from_mode(0o777))?;

    Ok(())
}

#[cfg(test)]
mod tests {
    use std::io::{
        BufReader,
        Read,
    };

    use tempfile::tempdir;

    use super::{
        compress_image_file,
        compress_image_file_bytes,
        download_pio_bin,
        try_pio,
    };
    use crate::helpers::dir::expand_tilde;

    #[tokio::test]
    async fn test_download_pio_binary() {
        download_pio_bin().await;
    }

    #[test]
    fn test_compress_image_file() {
        let dir = tempdir().unwrap();
        let output = dir.path().join("output.jpg");

        let input = expand_tilde("./test_data/img-jpg.jpg").unwrap();
        if let Err(e) = compress_image_file(&input, 10, &output) {
            println!("Test error: {:?}", e)
        };
        assert_eq!(output.as_path().exists(), true);
        std::fs::remove_file(output);
    }

    #[test]
    fn test_compress_image_file_bytes() {
        let input_path = expand_tilde("./test_data/img-jpg.jpg").unwrap();
        let input = std::fs::File::open(input_path).unwrap();
        let mut reader = BufReader::new(&input);
        let mut buffer = Vec::new();
        reader.read_to_end(&mut buffer).unwrap();

        let res = compress_image_file_bytes(&buffer, "jpeg", 80).unwrap();
        println!(
            "orig size: {:?}, compressed size: {:?}, file size reduced : {:3}%",
            res.i_size,
            res.o_size,
            res.reduced * 100_f64,
        );
        assert!(res.bytes.len() > 0);
    }

    #[tokio::test]
    async fn test_try_pio() {
        if try_pio() == false {
            println!("downloading pio ...");
            download_pio_bin().await;
        }
        assert!(try_pio() == true)
    }
}
