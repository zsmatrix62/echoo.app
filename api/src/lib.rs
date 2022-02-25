use crate::services::{service_port, spawn_services};

#[cfg(feature = "with-tauri")]
pub mod plugin;
mod services;

mod devutils_pb {
    tonic::include_proto!("devutils.json_formatter");
}

pub async fn start_services() -> anyhow::Result<()> {
    spawn_services(service_port()).await?;
    Ok(())
}
