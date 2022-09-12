//

use wasm_api::hash::*;
use wasm_bindgen_test::{wasm_bindgen_test, *};

wasm_bindgen_test_configure!(run_in_browser);

const TEST_CONTENT: [u8; 10] = [0; 10];

#[wasm_bindgen_test]
fn test_md5() {
    assert_eq!(digest_md5(&TEST_CONTENT), "a63c90cc3684ad8b0a2176a6a8fe9005")
}
