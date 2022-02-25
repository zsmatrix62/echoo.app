#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
