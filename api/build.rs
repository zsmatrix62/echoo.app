fn main() {
    tonic_build::configure()
        .compile(&["proto/tools.proto"], &["proto"])
        .unwrap();
}
