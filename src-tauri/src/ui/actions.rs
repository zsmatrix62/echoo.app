use serde::Serialize;
use tauri::{AppHandle, Manager, Wry};

#[allow(unused)]
fn emit_to_main<S>(app_handler: &AppHandle<Wry>, event: &str, payload: S)
where
    S: Serialize + Clone,
{
    let _ = app_handler.get_window("main").map(|win| {
        let _ = win.emit(event, payload);
    });
}

//<editor-fold desc="Actions">
#[allow(unused)]
pub fn action_quit_app(app_handler: &AppHandle<Wry>) {
    app_handler.exit(0)
}

#[allow(unused)]
pub fn action_open_settings(a: &AppHandle<Wry>) {
    action_show_app(a);
    emit_to_main(a, "open-settings", ());
}

#[allow(unused)]
pub fn action_open_about(a: &AppHandle<Wry>) {
    emit_to_main(a, "open-about", ());
}

#[allow(unused)]
pub fn action_open_help(a: &AppHandle<Wry>) {
    emit_to_main(a, "open-help", ());
}

#[allow(unused)]
pub fn action_show_app(a: &AppHandle<Wry>) {
    let _ = a.get_window("main").map(|win| {
        let _ = win.unminimize();
        let _ = win.show();
        let _ = win.set_focus();
    });
}

//</editor-fold>
