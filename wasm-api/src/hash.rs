use crypto::digest::Digest;
use crypto::md5::Md5;
use crypto::sha2::{Sha224, Sha256, Sha384, Sha512, Sha512Trunc224, Sha512Trunc256};
use wasm_bindgen::prelude::wasm_bindgen;

fn digest<T: Digest>(alg: &mut T, input_bytes: &[u8]) -> Result<String, String> {
    alg.input(input_bytes);
    Ok(alg.result_str())
}

#[wasm_bindgen]
pub fn digest_md5(i: &[u8]) -> String {
    digest(&mut Md5::new(), i).unwrap_or("".to_string())
}
// #[wasm_bindgen]
// pub fn digest_blake2b(i: &[u8]) -> String {
//     digest(&mut Blake2b::new(), i).unwrap_or("".to_string())
// }
// #[wasm_bindgen]
// pub fn digest_blake2s(i: &[u8]) -> String {
//     digest(&mut Blake2s::new(), i).unwrap_or("".to_string())
// }
#[wasm_bindgen]
pub fn digest_sha1(i: &[u8]) -> String {
    digest(&mut Sha512::new(), i).unwrap_or("".to_string())
}
#[wasm_bindgen]
pub fn digest_sha512(i: &[u8]) -> String {
    digest(&mut Sha512::new(), i).unwrap_or("".to_string())
}
#[wasm_bindgen]
pub fn digest_sha348(i: &[u8]) -> String {
    digest(&mut Sha384::new(), i).unwrap_or("".to_string())
}
#[wasm_bindgen]
pub fn digest_sha256(i: &[u8]) -> String {
    digest(&mut Sha256::new(), i).unwrap_or("".to_string())
}
#[wasm_bindgen]
pub fn digest_sha224(i: &[u8]) -> String {
    digest(&mut Sha224::new(), i).unwrap_or("".to_string())
}
// #[wasm_bindgen]
// pub fn digest_sha3(i: &[u8]) -> String {
//     digest(&mut Sha3::new(Sha3Mode::), i).unwrap_or("".to_string())
// }
#[wasm_bindgen]
pub fn digest_sha512trunc256(i: &[u8]) -> String {
    digest(&mut Sha512Trunc256::new(), i).unwrap_or("".to_string())
}
#[wasm_bindgen]
pub fn digest_sha512trunc224(i: &[u8]) -> String {
    digest(&mut Sha512Trunc224::new(), i).unwrap_or("".to_string())
}
