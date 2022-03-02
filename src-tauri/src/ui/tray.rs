use tauri::SystemTray;

pub fn create_tray() {
    let _system_tray = SystemTray::new();
}

#[derive(Default)]
pub struct SystemTrayBuilder {}

impl SystemTrayBuilder {
    pub fn build() -> Self {
        todo!()
    }
}
