//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;

use std::{assert, assert_ne};

use wasm_api::uuid::*;
use wasm_bindgen_test::{wasm_bindgen_test, *};

wasm_bindgen_test_configure!(run_in_browser);

// #[wasm_bindgen_test]
// fn test_uuid_gen_v1() {
//     let _: String = (1..=10)
//         .map(|_| {
//             let uuid = gen_uuid_v1();
//             assert_ne!(uuid.std_string, "");
//             ""
//         })
//         .collect();
// }

#[wasm_bindgen_test]
fn test_uuid_gen_v3_ok() {
    let _: String = (1..=10)
        .map(|_| {
            let uuid = gen_uuid_v3("ns:dns", "tes");
            assert!(uuid.is_ok());
            ""
        })
        .collect();
}

#[wasm_bindgen_test]
fn test_uuid_gen_v3_err() {
    let _: String = (1..=10)
        .map(|_| {
            let uuid = gen_uuid_v3("ssss", "test");
            assert!(uuid.is_err());
            ""
        })
        .collect();
}

#[wasm_bindgen_test]
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

#[wasm_bindgen_test]
fn test_gen_nanoid() {
    let id = gen_nanoid();
    assert_ne!(id, "");
}
