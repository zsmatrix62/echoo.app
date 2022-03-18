use tauri::Manager;

use crate::ui::app::{handle_run_events, register_shortcut};
use crate::ui::menu::main_menu_builder;
use crate::ui::tray::SystemTrayBuilder;

mod commands;
mod events;
mod libs;
mod ui;

fn main() {
    let builder = tauri::Builder::default();
    let app = builder
        .menu(main_menu_builder())
        .setup(|app| {
            app.get_window("main").and_then(|win| {
                let pkg_info = app.package_info();
                let window_title = format!("{} - v{}", pkg_info.name, pkg_info.version);
                win.set_title(window_title.as_str()).ok()
            });
            Ok(())
        })
        .system_tray(SystemTrayBuilder::build())
        .on_system_tray_event(SystemTrayBuilder::handle_tray_event)
        .invoke_handler(tauri::generate_handler![
            commands::fs::read_binary_file,
            commands::fs::write_binary_file,
            commands::os::get_system
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    register_shortcut(&app);
    app.run(handle_run_events);
}
