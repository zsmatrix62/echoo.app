use pio;
use tonic::{Code, Request, Response, Status};

use crate::devutils_pb::tiny_image_service_server::TinyImageService;
use crate::devutils_pb::{InCompressImage, OutCompressImage};

#[derive(Default)]
pub struct TinyImageServiceImpl {}

#[tonic::async_trait()]
impl TinyImageService for TinyImageServiceImpl {
    async fn compress_image(&self, rqst: Request<InCompressImage>) -> Result<Response<OutCompressImage>, Status> {
        let input = rqst.into_inner();
        let mut out = OutCompressImage::default();
        let s = match input.ext.as_str() {
            "png" => pio::png::read(input.data.as_slice()).map(|img| {
                pio::png::compress(&img, input.quality as u8).map_or(vec![], |(_, compressed_bytes)| compressed_bytes)
            }),
            "jpg" | "jpeg" => pio::jpeg::read(input.data.as_slice()).map(|img| {
                pio::png::compress(&img, input.quality as u8).map_or(vec![], |(_, compressed_bytes)| compressed_bytes)
            }),
            "webp" => pio::webp::read(input.data.as_slice()).map(|img| {
                pio::png::compress(&img, input.quality as u8).map_or(vec![], |(_, compressed_bytes)| compressed_bytes)
            }),
            _ => Err("failed to compress".to_string()),
        };

        if let Ok(bytes) = s {
            out.data = bytes;
            out.ext = input.ext.trim().to_lowercase();
            return Ok(Response::new(out));
        };

        Err(Status::new(Code::Unknown, "failed to compress"))
    }
}

#[cfg(test)]
mod tests {
    use std::time::Duration;

    use tonic::transport::{Channel, Server};

    use crate::devutils_pb::tiny_image_service_client::TinyImageServiceClient;
    use crate::devutils_pb::tiny_image_service_server::TinyImageServiceServer;

    use super::*;

    #[tokio::test]
    async fn test() {
        let _ = tokio::spawn(async {
            let addr = format!("0.0.0.0:{}", 3012).parse().unwrap();

            let res = Server::builder()
                .accept_http1(true)
                .add_service(tonic_web::config().enable(TinyImageServiceServer::new(TinyImageServiceImpl::default())))
                .serve(addr)
                .await;
            if let Err(er) = res {
                panic!("{:?}", er)
            } else {
                println!("server started successfully at port: 3012")
            }
        });

        tokio::time::sleep(Duration::from_secs(1)).await;

        let channel = Channel::builder("http://0.0.0.0:3012".parse().unwrap()).connect().await;
        if let Err(er) = channel {
            panic!("{:?}", er)
        };

        let mut client = TinyImageServiceClient::new(channel.unwrap());
        let read_res = std::fs::read("docs/img/json-1.png");
        if let Ok(file_data) = read_res {
            let rqst = InCompressImage {
                ext: "png".into(),
                data: file_data,
                quality: 50,
            };
            let res = client.compress_image(rqst).await;
            if let Ok(resp) = res {
                let out = resp.into_inner();
                assert_eq!(out.ext, "png".to_string());
                assert_ne!(out.data.len(), 0)
            } else {
                panic!("{:?}", res.err().unwrap().message())
            }
        } else {
            panic!("{:?}", read_res.err().unwrap())
        };
    }
}
