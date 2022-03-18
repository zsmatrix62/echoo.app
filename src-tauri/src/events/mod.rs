use tauri::App;

#[allow(dead_code)]
pub fn listen_all_events(_app: &mut App) {
    // show_tray_icon(app);
} //
  // fn show_tray_icon(app: &mut App) {
  //     #[derive(Deserialize, Serialize)]
  //     struct payload {
  //         pub show: bool,
  //     };
  //
  //     app.listen_global("show-tray-icon", |e| {
  //         if let Some(shown_str) = e.payload() {
  //             if let Ok(pl) = serde_json::from_str::<payload>(shown_str) {
  //                 println!("{}", pl.show);
  //             }
  //         };
  //     });
  // }
