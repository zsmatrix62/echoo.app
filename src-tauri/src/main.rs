#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

use tauri::{Manager};
use tauri_plugin_window_state::WindowState;

use crate::ui::menu::main_menu_builder;

mod libs;
mod ui;

fn main() {
    let builder = tauri::Builder::default();
    builder
        .menu(main_menu_builder())
        .plugin(WindowState::default())
        .plugin(echoo_app_api::plugin::LocalAPIPlugin::new())
        .setup(|app| {
            app.get_window("main").and_then(|win| {
                let pkg_info = app.package_info();
                let window_title = format!("{} - v{}", pkg_info.name, pkg_info.version);
                win.set_title(window_title.as_str()).ok()
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
