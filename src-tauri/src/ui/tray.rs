use tauri::SystemTray;
use tauri::SystemTrayMenu;
use tauri::{CustomMenuItem, Icon};

#[allow(dead_code)]
pub struct SystemTrayBuilder {}

impl SystemTrayBuilder {
    #[allow(dead_code)]
    pub fn build() -> SystemTray {
        Self::new_tray()
    }

    #[allow(dead_code)]
    fn new_tray() -> SystemTray {
        let icon_bytes = include_bytes!("../../icons/icon.ico").to_vec();
        let tray_icon = Icon::Raw(icon_bytes);

        Self::build_menu(SystemTray::new().with_icon(tray_icon))
    }

    #[allow(dead_code)]
    fn build_menu(tray: SystemTray) -> SystemTray {
        let menu = SystemTrayMenu::new();

        let quit = CustomMenuItem::new("quit".to_string(), "Quit");
        tray.with_menu(menu.add_item(quit))
    }
}
