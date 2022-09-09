//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;

use std::{assert, assert_ne};

use wasm_api::uuid::{gen_uuid_v1, gen_uuid_v3};
use wasm_bindgen_test::{wasm_bindgen_test, *};

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_uuid_gen_v1() {
    let _: String = (1..=10)
        .map(|_| {
            let uuid = gen_uuid_v1();
            assert_ne!(uuid, "");
            uuid
        })
        .collect();
}

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
