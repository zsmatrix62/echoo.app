use std::net::TcpListener;

use tonic::transport::Server;

use crate::devutils_pb::json_formatter_service_server::JsonFormatterServiceServer;
use crate::services::json_formatter::JsonFormatterServiceImpl;

pub mod json_formatter;

fn tonic_config() -> tonic_web::Config {
    tonic_web::config().allow_all_origins()
}

pub fn service_port() -> u16 {
    let listen_port = match std::env::var("RUST_DEBUG") {
        Ok(val) => {
            if val == "1" {
                "0"
            } else {
                "8080"
            }
        }
        _ => "8080",
    };

    let addr = format!("0.0.0.0:{}", listen_port);
    println!("serving grpc web at: {}", addr);
    let listener = TcpListener::bind(addr).unwrap();
    let port = listener.local_addr().unwrap().port();
    port
}

pub async fn spawn_services(port: u16) -> anyhow::Result<()> {
    let addr = format!("0.0.0.0:{}", port).parse().unwrap();
    Server::builder()
        .accept_http1(true)
        .add_service(tonic_config().enable(JsonFormatterServiceServer::new(JsonFormatterServiceImpl::default())))
        .serve(addr)
        .await?;

    Ok(())
}
