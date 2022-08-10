use tauri::{App, AppHandle, RunEvent, Wry};

pub fn handle_run_events(_app_handle: &AppHandle<Wry>, e: RunEvent) {
    match e {
        RunEvent::Exit => {}
        RunEvent::ExitRequested { .. } => {}
        RunEvent::WindowEvent { label: _, event, .. } => match event {
            // tauri::WindowEvent::CloseRequested { api, .. } => {
            //     api.prevent_close();
            //     let _ = app_handle.get_window("main").map(|win| {
            //         let _ = win.hide();
            //     });
            // }
            _ => {}
        },
        RunEvent::Ready => {}
        RunEvent::Resumed => {}
        RunEvent::MainEventsCleared => {}
        _ => {}
    }
}

pub fn register_shortcut(_app: &App<Wry>) {
    // let mut mgr = app.global_shortcut_manager();
    // let a = app.handle();
    // let _ = mgr.register("Cmd+q", move || {
    //     let window = a.get_window("main");
    //     let a = a.clone();
    //     tauri::api::dialog::ask(
    //         window.as_ref(),
    //         "",
    //         "Are you sure that you want to quit echoo?",
    //         move |answer| {
    //             if answer {
    //                 std::thread::spawn(move || {
    //                     a.exit(0);
    //                 });
    //             }
    //         },
    //     );
    // });
}
