use fake::{uuid::UUIDv1, Fake};
use uuid::{uuid, Uuid};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
#[derive(Default, Debug)]
pub struct UUIDRes {}

#[wasm_bindgen]
/// Generate UUID v1 using faker, mac address is not used.
pub fn gen_uuid_v1() -> String {
    let uuidv1 = UUIDv1.fake();
    uuidv1
}

#[wasm_bindgen]
/// Generate UUID Version-3
///
/// * `ns`: namspace: use one of below or customized UUID in foramt: 00000000-0000-0000-0000-000000000000:
///
/// pre-defined UUIDs:
/// - ns:dns
/// - ns:url
/// - ns:oid
/// - ns:x500
/// * `name`: anything
pub fn gen_uuid_v3(ns: &str, name: &str) -> Result<String, String> {
    let ns = match ns {
        "ns:dns" => Ok(Uuid::NAMESPACE_DNS),
        "ns:url" => Ok(Uuid::NAMESPACE_URL),
        "ns:oid" => Ok(Uuid::NAMESPACE_OID),
        "ns:x500" => Ok(Uuid::NAMESPACE_X500),
        _ => Uuid::parse_str(ns)
            .map_err(|_| "incorrect uuid format, shall be in format: 00000000-0000-0000-0000-000000000000".to_string()),
    }?;
    let uuid = Uuid::new_v3(&ns, name.as_bytes()).to_string();
    Ok(uuid)
}
