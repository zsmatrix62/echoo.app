use tauri::SystemTray;
use tauri::SystemTrayMenu;
use tauri::{CustomMenuItem, Icon};

pub struct SystemTrayBuilder {}

impl SystemTrayBuilder {
    pub fn build() -> SystemTray {
        Self::new_tray()
    }

    fn new_tray() -> SystemTray {
        let icon_bytes = include_bytes!("../../icons/icon.ico").to_vec();
        let tray_icon = Icon::Raw(icon_bytes);

        Self::build_menu(SystemTray::new().with_icon(tray_icon).with_icon_as_template(true))
    }

    fn build_menu(tray: SystemTray) -> SystemTray {
        let menu = SystemTrayMenu::new();

        let quit = CustomMenuItem::new("quit".to_string(), "Quit");
        tray.with_menu(menu.add_item(quit))
    }
}
