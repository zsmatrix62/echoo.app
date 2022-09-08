use mac_address::{get_mac_address, MacAddress};
use std::time::SystemTime;
use uuid::{
    v1::{Context, Timestamp},
    Uuid,
};
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
#[derive(Default, Debug)]
pub struct UUIDRes {}

#[wasm_bindgen]
/// Generate UUID v1
pub fn gen_uuid_v1() -> String {
    let ctx = Context::new_random();
    let now = SystemTime::now();
    let epoch = now.duration_since(SystemTime::UNIX_EPOCH).unwrap();
    let ts = Timestamp::from_unix(ctx, epoch.as_secs(), epoch.subsec_nanos());
    let default_mac = MacAddress::new([0u8; 6]);
    let mac_bytes = get_mac_address()
        .map_or(default_mac, |mac| mac.unwrap_or(default_mac))
        .bytes();
    let uuid = Uuid::new_v1(ts, &mac_bytes);
    uuid.to_string()
}

#[cfg(test)]
mod tests {
    #[allow(unused_imports)]
    use super::*;

    #[test]
    fn test_uuid_gen_v1() {
        let _: String = (1..=10)
            .map(|_| {
                let uuid = gen_uuid_v1();
                println!("{:?}", uuid);
                uuid
            })
            .collect();
    }
}
