extern crate core;

use crate::services::{service_port, spawn_services};

pub mod services;

mod devutils_pb {
    tonic::include_proto!("devutils.json_formatter");
    tonic::include_proto!("devutils.tiny_img");
}

pub async fn start_services() -> anyhow::Result<()> {
    spawn_services(service_port()).await?;
    Ok(())
}
