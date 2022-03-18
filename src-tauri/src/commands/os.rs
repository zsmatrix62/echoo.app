use std::env;

use tauri::command;

#[command]
pub async fn get_system() -> String {
    env::consts::OS.to_string()
}
