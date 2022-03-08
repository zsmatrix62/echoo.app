use fake::uuid::UUIDv4;
use fake::{faker, Fake};
use rand::Rng;
use tonic::{Code, Request, Response, Status};
use uuid::Uuid;

use crate::devutils_pb::json_formatter_service_server::JsonFormatterService;
use crate::devutils_pb::out_validate_json::ValidationError;
use crate::devutils_pb::{InValidateJson, OutGetRandomJson, OutValidateJson};

#[derive(Default)]
pub struct JsonFormatterServiceImpl {}

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

#[tonic::async_trait()]
impl JsonFormatterService for JsonFormatterServiceImpl {
    async fn get_random_json(&self, _: Request<()>) -> Result<Response<OutGetRandomJson>, Status> {
        let uid: Uuid = UUIDv4.fake();
        let price = faker::number::en::Digit().fake::<String>();
        let fake_data = || random_json::Book {
            title: Some(faker::lorem::en::Sentence(5..10).fake::<String>()),
            sold: Some(faker::boolean::en::Boolean(5).fake()),
            author: Some(faker::name::en::NameWithTitle().fake::<String>()),
            category: Some(faker::lorem::en::Word().fake()),
            price: Some(price.parse().unwrap()),
            isbn: Some(uid.to_string()),
            email: Some(faker::internet::en::FreeEmail().fake::<String>()),
        };

        let mut rng = rand::thread_rng();
        let n1: u8 = rng.gen_range(1..5);
        let fake_json_data = (1..=n1).into_iter().map(|_| fake_data()).collect::<Vec<_>>();

        serde_json::to_string(&fake_json_data)
            .map_err(|err| Status::new(Code::Unavailable, err.to_string()))
            .map(|data| Response::new(OutGetRandomJson { input_sample: data }))
    }

    async fn validate_json(&self, request: Request<InValidateJson>) -> Result<Response<OutValidateJson>, Status> {
        let in_json_data = request.into_inner().input;
        let validation_errors = jsonprima::validate(&in_json_data);

        Ok(Response::new(OutValidateJson {
            errors: validation_errors
                .into_iter()
                .map(|v_err| ValidationError {
                    description: v_err.err.description().to_string(),
                    code: v_err.err.code().to_string(),
                    index_start: v_err.index_start as u64,
                    index_end: v_err.index_end as u64,
                })
                .collect(),
        }))
    }
}
