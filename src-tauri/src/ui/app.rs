use tauri::{App, AppHandle, GlobalShortcutManager, Manager, RunEvent, Wry};

pub fn handle_run_events(app_handle: &AppHandle<Wry>, e: RunEvent) {
    match e {
        RunEvent::Exit => {}
        RunEvent::ExitRequested { .. } => {}
        RunEvent::CloseRequested { api, .. } => {
            api.prevent_close();
            let _ = app_handle.get_window("main").map(|win| {
                win.hide();
            });
        }
        RunEvent::WindowClosed(_) => {}
        RunEvent::Ready => {}
        RunEvent::Resumed => {}
        RunEvent::MainEventsCleared => {}
        _ => {}
    }
}

pub fn register_shortcut(app: &App<Wry>) {
    let mut mgr = app.global_shortcut_manager();
    let a = app.handle().clone();
    let _ = mgr.register("Cmd+q", move || {
        let window = a.get_window("main");
        let a = a.clone();
        tauri::api::dialog::ask(
            window.as_ref(),
            "",
            "Are you sure that you want to quit echoo?",
            move |answer| {
                if answer {
                    std::thread::spawn(move || {
                        a.exit(0);
                    });
                }
            },
        );
    });
}
