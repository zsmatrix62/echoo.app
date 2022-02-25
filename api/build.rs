use std::env;
use std::path::{Path, PathBuf};

fn collect_files(proto_dir: &str) -> Vec<impl AsRef<Path>> {
    let paths = std::fs::read_dir(proto_dir).unwrap();
    paths
        .into_iter()
        .map(|a| {
            let entry = a.unwrap();
            entry.path()
        })
        .filter(|p| p.is_file())
        .collect()
}

fn main() {
    println!("cargo:rerun-if-changed=proto/devutils/json-formatter.prost");
    for out in vec![PathBuf::from(env::var("OUT_DIR").unwrap())] {
        // let descriptor_file = out.join("descriptors.bin");

        let protos = collect_files("proto/devutils");
        if let Err(er) = tonic_build::configure()
            .type_attribute(
                ".",
                "#[derive(::serde::Serialize, ::serde::Deserialize)]  #[serde(rename_all=\"camelCase\")]",
            )
            .extern_path(".google.protobuf.Timestamp", "::prost_wkt_types::Timestamp")
            .build_server(true)
            .build_client(true)
            .format(true)
            // .compile_well_known_types(true)
            .out_dir(out.clone())
            // .file_descriptor_set_path(&descriptor_file)
            .compile(protos.as_slice(), &["proto"])
        {
            panic!("failed to build proto: {:?}", er)
        };
    }
}
