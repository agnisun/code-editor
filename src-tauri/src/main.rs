#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod fs;

#[tauri::command]
fn open_folder(dir_path: &str) -> String {
    let files = fs::read_directory(dir_path);
    let files_str = match serde_json::to_string(&files) {
        Ok(str) => str,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };

    files_str
}

#[tauri::command]
fn get_file_content(file_path: &str) -> String {
    let content = fs::read_file(file_path);
    content
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_folder, get_file_content])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
