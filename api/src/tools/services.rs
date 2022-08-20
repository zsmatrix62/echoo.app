use tonic::{Request, Response, Status};

use super::{pb::*, EchooToolsService};
#[cfg(feature = "tauri")]
use crate::helpers::pio::{compress_image_file_bytes, download_pio_bin, try_pio};

#[tonic::async_trait]
impl tools_server::Tools for EchooToolsService {
    #[cfg(not(feature = "server"))]
    #[cfg(not(feature = "tauri"))]
    async fn say_hello(&self, _rqst: Request<InSayHello>) -> Result<Response<OutSayHello>, Status> {
        unimplemented!()
    }

    #[cfg(feature = "tauri")]
    async fn say_hello(&self, rqst: Request<InSayHello>) -> Result<Response<OutSayHello>, Status> {
        let mut res = OutSayHello::default();
        let in_payload = rqst.into_inner();
        res.message = format!("Hello {}! -- from tauri", in_payload.name);
        let resp = Response::new(res);
        Ok(resp)
    }

    // REGION Compress Image
    #[cfg(not(feature = "server"))]
    #[cfg(not(feature = "tauri"))]
    async fn compress_image(&self, _: Request<InCompressImage>) -> Result<Response<OutCompressImage>, Status> {
        unimplemented!()
    }

    #[cfg(feature = "tauri")]
    async fn compress_image(&self, request: Request<InCompressImage>) -> Result<Response<OutCompressImage>, Status> {
        let payload = request.into_inner();

        match compress_image_file_bytes(&payload.content, &payload.format, payload.quality) {
            Ok(o) => {
                let mut res = OutCompressImage::default();
                res.i_size = o.i_size;
                res.o_size = o.o_size;
                res.content = o.bytes.to_vec();
                let resp = Response::new(res);
                Ok(resp)
            }
            Err(e) => Err(Status::new(tonic::Code::Internal, e.to_string())),
        }
    }

    #[cfg(not(feature = "server"))]
    #[cfg(not(feature = "tauri"))]
    async fn download_pio_binary(
        &self,
        _: Request<InDownloadPioBinary>,
    ) -> Result<Response<OutDownloadPioBinary>, Status> {
        unimplemented!()
    }

    #[cfg(feature = "tauri")]
    async fn download_pio_binary(
        &self,
        _request: Request<InDownloadPioBinary>,
    ) -> Result<Response<OutDownloadPioBinary>, Status> {
        match download_pio_bin().await {
            Ok(..) => {
                let res = OutDownloadPioBinary::default();
                let resp = Response::new(res);
                Ok(resp)
            }
            Err(..) => Err(Status::new(tonic::Code::Unavailable, "download error")),
        }
    }

    #[cfg(not(feature = "server"))]
    #[cfg(not(feature = "tauri"))]
    async fn try_pio_binary(&self, _: Request<InTryPioBinary>) -> Result<Response<OutTryPioBinary>, Status> {
        unimplemented!()
    }

    #[cfg(feature = "tauri")]
    async fn try_pio_binary(&self, _request: Request<InTryPioBinary>) -> Result<Response<OutTryPioBinary>, Status> {
        let mut res = OutTryPioBinary::default();
        res.ok = try_pio();
        let resp = Response::new(res);
        Ok(resp)
    }
    // ENDREGION
}

#[cfg(test)]
mod tests {

    use std::io::{BufReader, Read};

    use super::*;
    use crate::{
        helpers::{call_service, pio::get_pio_binary},
        random_port, spawn_service,
    };

    #[tokio::test]
    async fn service_try_and_download_pio() {
        let port = random_port();
        spawn_service(port).await;
        // remove pio binary for test
        let pio_bin = get_pio_binary();
        std::fs::remove_file(pio_bin);

        // check binary does not exist
        let msg = InTryPioBinary::default();
        #[allow(unused)]
        let reply_try_binary =
            call_service::<InTryPioBinary, OutTryPioBinary>("tools.Tools", "TryPioBinary", port, msg).await;
        assert!(!reply_try_binary.ok);

        // downloa binary
        let in_download_msg = InDownloadPioBinary::default();
        #[allow(unused)]
        let reply_download_binary = call_service::<InDownloadPioBinary, OutDownloadPioBinary>(
            "tools.Tools",
            "DownloadPioBinary",
            port,
            in_download_msg,
        )
        .await;

        // check again binary exist
        let msg = InTryPioBinary::default();
        #[allow(unused)]
        let reply_try_binary =
            call_service::<InTryPioBinary, OutTryPioBinary>("tools.Tools", "TryPioBinary", port, msg).await;
        assert!(reply_try_binary.ok);
    }

    #[tokio::test]
    async fn service_compress_image() {
        let port = random_port();
        spawn_service(port).await;

        let mut msg = InCompressImage::default();

        let in_file = std::fs::File::open("/Users/kylehuang/dev/echoo-app/api/test_data/img-jpg.jpg").unwrap();
        let mut reader = BufReader::new(&in_file);
        let mut buf = Vec::new();
        reader.read_to_end(&mut buf);
        msg.content = buf;
        msg.quality = 50;
        msg.format = "jpg".to_string();

        #[allow(unused)]
        let reply = call_service::<InCompressImage, OutCompressImage>("tools.Tools", "CompressImage", port, msg).await;
        assert!(reply.o_size > 0);
        assert!(reply.i_size > 0);
    }
}
