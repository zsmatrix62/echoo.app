use fake::uuid::UUIDv4;
use fake::{faker, Fake};
use uuid::Uuid;
use wasm_bindgen::prelude::*;

use random_json::Book;

mod random_json {
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize)]
    pub struct CommonApiGetUserInfoRes {
        pub store: Option<Store>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Store {
        pub book: Option<Vec<Book>>,
        pub bicycle: Option<Bicycle>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Bicycle {
        pub color: Option<String>,
        pub price: Option<f64>,
    }

    #[derive(Debug, Serialize, Deserialize)]
    pub struct Book {
        pub category: Option<String>,
        pub sold: Option<bool>,
        pub author: Option<String>,
        pub title: Option<String>,
        pub price: Option<f64>,
        pub isbn: Option<String>,
        pub email: Option<String>,
    }
}

#[wasm_bindgen]
pub fn get_random_json() -> String {
    let uid: Uuid = UUIDv4.fake();
    let price = faker::number::en::Digit().fake::<String>();
    let fake_data = || Book {
        title: Some(faker::lorem::en::Sentence(5..10).fake::<String>()),
        sold: Some(faker::boolean::en::Boolean(5).fake()),
        author: Some(faker::name::en::NameWithTitle().fake::<String>()),
        category: Some(faker::lorem::en::Word().fake()),
        price: Some(price.parse().unwrap()),
        isbn: Some(uid.to_string()),
        email: Some(faker::internet::en::FreeEmail().fake::<String>()),
    };

    // let mut rng = rand::thread_rng();
    let n1: u8 = 5;
    let fake_json_data = (1..=n1).into_iter().map(|_| fake_data()).collect::<Vec<_>>();

    serde_json::to_string(&fake_json_data).unwrap()
}

#[wasm_bindgen(getter_with_clone)]
pub struct ValidationError {
    pub code: String,
    pub description: String,
    pub index_start: u64,
    pub index_end: u64,
}

#[wasm_bindgen]
pub fn validate_json(in_json: String) -> Option<ValidationError> {
    jsonprima::validate(&in_json)
        .into_iter()
        .map(|v_err| ValidationError {
            code: v_err.err.code().to_string(),
            description: v_err.err.description().to_string(),
            index_start: v_err.index_start as u64,
            index_end: v_err.index_end as u64,
        })
        .next()
}
