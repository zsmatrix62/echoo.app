use std::marker::PhantomData;

use api::{random_port, run_services};
use tauri::{
    plugin::{Plugin, Result as PluginResult},
    AppHandle, Runtime,
};

pub(crate) struct EchooAPIPluginBuilder<R: Runtime> {
    _ph: PhantomData<R>,
}

impl<R: Runtime> EchooAPIPluginBuilder<R> {
    pub fn new() -> EchooAPIPlugin<R> {
        let port = random_port();
        EchooAPIPlugin {
            port,
            _phantom: Box::new(|_| ()),
        }
    }
}

pub(crate) struct EchooAPIPlugin<R: Runtime> {
    port: u16,
    #[allow(dead_code)]
    _phantom: Box<dyn Fn(PhantomData<R>) + Send + Sync>,
}

impl<R: Runtime> Plugin<R> for EchooAPIPlugin<R> {
    fn name(&self) -> &'static str {
        "api"
    }

    fn initialization_script(&self) -> Option<String> {
        let port = self.port;
        tauri::async_runtime::spawn(async move {
            let _ = run_services(port).await;
        });
        Some(format!("window.rpc_port={}", self.port))
    }

    /// initialize plugin with the config provided on `tauri.conf.json > plugins > $yourPluginName` or the default value.
    fn initialize(&mut self, _app: &AppHandle<R>, _config: serde_json::Value) -> PluginResult<()> {
        Ok(())
    }
}
