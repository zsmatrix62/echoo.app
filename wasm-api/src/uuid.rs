use fake::{uuid::UUIDv1, Fake};
use nanoid::nanoid;
use uuid::{Uuid, Version};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
#[derive(Clone, Default, Debug)]
/// UUIDV1 only: (nanoseconds,random-clock)
pub struct RFC4122(String, String); // originally be type of (u64,u32)

#[wasm_bindgen(getter_with_clone)]
#[derive(Default, Debug)]
/// Example Data:
///
/// ```rust
/// UUIDRes {
///   std_string: "1acb259e-4a60-133f-8fc1-83ba07d9470f",
///   integer_value: "35614727142913433572590996256676464399",
///   version_num: 1,
///   version: "Mac Address",
///   variant: "Standard (DCE 1.1, ISO/IEC 11578:1996)",
///   rfc4122: RFC4122("233987482273392030", "4033"),
///   raw_content: "1a:cb:25:9e:4a:60:13:3f:8f:c1:83:ba:7:d9:47:f",
///   simple_string: "1acb259e4a60133f8fc183ba07d9470f",
///   urn_string: "urn:uuid:1acb259e-4a60-133f-8fc1-83ba07d9470f"
/// }
/// ```
/// * `rfc4122`: UUIDV1 only: (nanoseconds,random-clock)
pub struct UUIDRes {
    pub std_string: String,
    pub integer_value: String,
    pub version_num: usize,
    pub version: String,
    pub variant: String,
    pub rfc4122: RFC4122,
    pub raw_content: String,

    pub simple_string: String,
    pub urn_string: String,
}

impl UUIDRes {
    pub fn new(uuid: Uuid) -> Self {
        let var = uuid.get_variant();
        let variant = match var {
            uuid::Variant::RFC4122 => "Standard (DCE 1.1, ISO/IEC 11578:1996)".to_string(),
            _ => var.to_string(),
        };
        let rfc4122 = uuid
            .get_timestamp()
            .map_or(RFC4122("0".to_string(), "0".to_string()), |t| {
                let unix = t.to_rfc4122();
                RFC4122(unix.0.to_string(), unix.1.to_string())
            });
        let version_num = uuid.get_version_num();
        let version = match uuid.get_version().unwrap_or(uuid::Version::Nil) {
            Version::Random => "Random",
            Version::Mac => "Mac Address",
            Version::Dce => "Dce Security",
            Version::Md5 => "Random",
            Version::Sha1 => "Sha1-Hash",
            _ => "Special Case",
        }
        .to_string();
        let integer_value = format!("{}", uuid.as_u128());

        let simple_string = uuid.simple().to_string();
        let urn_string = uuid.urn().to_string();
        // let node = uuid.to_fields_le().3;
        let bytes = uuid.as_bytes();
        let raw_contents: Vec<String> = bytes.iter().map(|b| format!("{:x}", b)).collect();
        let raw_content = raw_contents.join(":");

        UUIDRes {
            std_string: uuid.to_string(),
            integer_value,
            version_num,
            version,
            variant,
            rfc4122,
            raw_content,

            simple_string,
            urn_string,
        }
    }
}

fn _gen_uuid_v3_or_v5(version: u8, ns: &str, name: &str) -> Result<String, String> {
    let ns = match ns {
        "ns:dns" => Ok(Uuid::NAMESPACE_DNS),
        "ns:url" => Ok(Uuid::NAMESPACE_URL),
        "ns:oid" => Ok(Uuid::NAMESPACE_OID),
        "ns:x500" => Ok(Uuid::NAMESPACE_X500),
        _ => Uuid::parse_str(ns)
            .map_err(|_| "incorrect uuid format, shall be in format: 00000000-0000-0000-0000-000000000000".to_string()),
    }?;
    match version {
        3 => Ok(Uuid::new_v3(&ns, name.as_bytes()).to_string()),
        5 => Ok(Uuid::new_v5(&ns, name.as_bytes()).to_string()),
        _ => Err("incorrect version number: must be 3 or 5".to_string()),
    }
}

#[wasm_bindgen]
/// Generate UUID v1 using faker, mac address is not used.
pub fn gen_uuid_v1() -> UUIDRes {
    let uuidv1: String = UUIDv1.fake();
    UUIDRes::new(Uuid::parse_str(&uuidv1).unwrap())
}

#[wasm_bindgen]
/// Generate UUID Version-3
///
/// * `ns`: namspace: use one of below pre-defined or customized UUID in foramt: 00000000-0000-0000-0000-000000000000:
///
/// pre-defined UUIDs:
/// - ns:dns
/// - ns:url
/// - ns:oid
/// - ns:x500
/// * `name`: anything
pub fn gen_uuid_v3(ns: &str, name: &str) -> Result<String, String> {
    _gen_uuid_v3_or_v5(3, ns, name)
}

#[wasm_bindgen]
pub fn gen_uuid_v4() -> String {
    let uuid = Uuid::new_v4();
    uuid.to_string()
}

#[wasm_bindgen]
/// Generate UUID Version-5
///
/// * `ns`: namspace: use one of below pre-defined or customized UUID in foramt: 00000000-0000-0000-0000-000000000000:
///
/// pre-defined UUIDs:
/// - ns:dns
/// - ns:url
/// - ns:oid
/// - ns:x500
/// * `name`: anything
pub fn gen_uuid_v5(ns: &str, name: &str) -> Result<String, String> {
    _gen_uuid_v3_or_v5(5, ns, name)
}

#[wasm_bindgen]
pub fn gen_nanoid() -> String {
    nanoid!()
}

#[wasm_bindgen]
pub fn decode_uuid(uuid: &str) -> Result<UUIDRes, String> {
    let uuid = Uuid::parse_str(uuid).map_err(|_| "incorrect uuid.".to_string())?;
    Ok(UUIDRes::new(uuid))
}

#[cfg(test)]
mod test {
    use crate::uuid::*;

    #[test]
    fn test_decode_uuid() {
        let uuid = decode_uuid("8cbdc22b-0dca-49c3-bb5f-4a71286834fc");
        assert!(uuid.is_ok());
        if let Ok(uid) = uuid {
            assert_eq!(uid.std_string, "8cbdc22b-0dca-49c3-bb5f-4a71286834fc");
            assert_eq!(uid.simple_string, "8cbdc22b0dca49c3bb5f4a71286834fc");
            assert_eq!(uid.urn_string, "urn:uuid:8cbdc22b-0dca-49c3-bb5f-4a71286834fc");
            assert_eq!(uid.version_num, 4);
            assert_eq!(uid.version, "Random");
            assert_eq!(uid.variant, "Standard (DCE 1.1, ISO/IEC 11578:1996)");
            assert_eq!(uid.integer_value, "187077201714693257652363591436535870716");
        }
    }

    #[test]
    fn test_gen_uuid_v1() {
        let _: String = (1..=109)
            .map(|_| {
                let uuid = gen_uuid_v1();
                println!("{:?}\n", uuid);
                ""
            })
            .collect();
    }
}
