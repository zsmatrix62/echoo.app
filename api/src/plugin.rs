use tauri::{
    plugin::{Plugin, Result as PluginResult},
    AppHandle, PageLoadPayload, Runtime, Window,
};

use crate::{service_port, spawn_services};

pub struct LocalAPIPlugin {
    local_api_port: u16,
}

impl LocalAPIPlugin {
    pub fn new() -> Self {
        LocalAPIPlugin {
            local_api_port: service_port(),
        }
    }
}

impl<R: Runtime> Plugin<R> for LocalAPIPlugin {
    fn name(&self) -> &'static str {
        "devutils-local-api"
    }

    fn initialize(&mut self, _: &AppHandle<R>, _config: serde_json::Value) -> PluginResult<()> {
        let port = self.local_api_port;
        tauri::async_runtime::spawn(async move { spawn_services(port).await });
        Ok(())
    }

    fn created(&mut self, _: Window<R>) {}

    fn on_page_load(&mut self, window: Window<R>, _: PageLoadPayload) {
        // todo control to use local api or web service just remove this variable from window object
        let _ = window.eval(&format!("window['local-api-port']={}", self.local_api_port));
    }
}
