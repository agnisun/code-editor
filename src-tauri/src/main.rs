#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod fs;

#[tauri::command]
fn open_folder(dir_path: &str) -> String {
    let files = fs::read_directory(dir_path);
    files
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_folder])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
