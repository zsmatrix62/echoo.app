use tauri::{AppHandle, SystemTray, SystemTrayEvent, Wry};
use tauri::{CustomMenuItem, Icon};
use tauri::{MenuItem, SystemTrayMenu, SystemTrayMenuItem};

use crate::ui::actions::{action_open_about, action_open_help, action_open_settings, action_quit_app, action_show_app};

pub struct SystemTrayBuilder {}

impl SystemTrayBuilder {
    pub fn build() -> SystemTray {
        Self::new_tray()
    }

    fn new_tray() -> SystemTray {
        let icon_bytes = include_bytes!("../../icons/icon.ico").to_vec();
        let tray_icon = Icon::Raw(icon_bytes);
        SystemTray::new().with_icon(tray_icon).with_menu(Self::build_menu())
    }

    fn build_menu() -> SystemTrayMenu {
        let mut menu = SystemTrayMenu::new();
        let action_names = vec!["Open", "-", "Preference", "-", "Quit"];
        for tray_menu_name in action_names.into_iter() {
            let id = tray_menu_name.to_lowercase().to_string();
            if id.as_str() == "-" {
                menu = menu.add_native_item(SystemTrayMenuItem::Separator);
            } else {
                let mut item = CustomMenuItem::new(id, tray_menu_name);
                // if tray_menu_name == "Open" {
                //     item = item.accelerator("Ctrl+Alt+Cmd+E");
                // }
                menu = menu.add_item(item)
            };
        }
        menu
    }

    pub fn handle_tray_event(app_handler: &AppHandle<Wry>, e: SystemTrayEvent) {
        match e {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "open" => action_show_app(app_handler),
                "quit" => action_quit_app(app_handler),
                "preference" => action_open_settings(app_handler),
                "about" => action_open_about(app_handler),
                "help" => action_open_help(app_handler),
                _ => {}
            },
            SystemTrayEvent::LeftClick { .. } => {}
            SystemTrayEvent::RightClick { .. } => {}
            SystemTrayEvent::DoubleClick { .. } => {
                action_show_app(app_handler);
            }
            _ => {}
        }
    }
}
