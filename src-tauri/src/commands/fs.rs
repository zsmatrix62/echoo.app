use std::fs;
use std::io::Write;

use tauri::command;

#[command]
pub async fn read_binary_file(path: String) -> Option<(String, Vec<u8>)> {
    if let Ok(array) = tauri::api::file::read_binary(path) {
        let digest = md5::compute(array.clone());
        Some((format!("{:x}", digest), array))
    } else {
        None
    }
}

#[command]
pub async fn write_binary_file(window: tauri::Window, data: String, file_name: String) {
    tauri::api::dialog::FileDialogBuilder::new().pick_folder(move |ph| {
        if let Some(dir_path) = ph {
            let dest_file = dir_path.join(file_name);
            if let Ok(bin_data) = base64::decode(data) {
                match fs::File::create(&dest_file).and_then(move |mut f| f.write_all(&bin_data)) {
                    Ok(_) => {
                        let _ = window.emit(
                            "be-success",
                            format!("File saved to: {}", dest_file.as_os_str().to_str().unwrap()),
                        );
                    }
                    Err(_er) => {
                        let _ = window.emit("be-error", format!("saving file failed: {}", _er));
                    }
                };
            }
        }
    });
}
