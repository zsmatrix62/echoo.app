#![allow(unused_must_use)]
#![allow(dead_code)]

use tonic::transport::Server;

pub(crate) mod helpers;
pub mod tools;

pub fn random_port() -> u16 {
    // let listener = TcpListener::bind("[::1]:0").unwrap();
    // let addr = listener.local_addr().unwrap();
    // addr.port()
    64288
}

pub async fn run_services(port: u16) -> Result<(), Box<dyn std::error::Error>> {
    let addr = format!("[::1]:{}", port).parse().unwrap();
    let tools_service_rpc = tools::ToolsServer::new(tools::EchooToolsService::default());
    let tools_service_web = tonic_web::config().allow_all_origins().enable(tools_service_rpc);

    Server::builder()
        .accept_http1(true)
        .add_service(tools_service_web)
        .serve(addr)
        .await?;

    Ok(())
}

pub(crate) async fn spawn_service(port: u16) {
    tokio::spawn(async move {
        run_services(port).await;
    });
}
