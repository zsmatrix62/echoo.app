mod services;
mod pb {
    tonic::include_proto!("tools");
}
pub(crate) use pb::tools_server::ToolsServer;

#[derive(Default)]
pub struct EchooToolsService {}
