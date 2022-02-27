use tauri::{
    async_runtime,
    plugin::{Plugin, Result as PluginResult},
    AppHandle, PageLoadPayload, Runtime, Window,
};

use echoo_app_api::services::{service_port, spawn_services};

pub struct EchooAPIServerPlugin {
    local_api_port: u16,
}

impl Default for EchooAPIServerPlugin {
    fn default() -> Self {
        EchooAPIServerPlugin {
            local_api_port: service_port(),
        }
    }
}

impl<R: Runtime> Plugin<R> for EchooAPIServerPlugin {
    fn name(&self) -> &'static str {
        "echoo-api"
    }

    fn initialize(&mut self, _: &AppHandle<R>, _config: serde_json::Value) -> PluginResult<()> {
        let port = self.local_api_port;
        async_runtime::spawn(async move { spawn_services(port).await });
        Ok(())
    }

    fn created(&mut self, _: Window<R>) {}

    fn on_page_load(&mut self, window: Window<R>, _: PageLoadPayload) {
        // todo control to use local api or web service just remove this variable from window object
        let _ = window.eval(&format!("window['local-api-port']={}", self.local_api_port));
    }
}
