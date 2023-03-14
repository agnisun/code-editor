#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

#[path = "lib/mod.rs"]
mod lib;
mod file_sys;


#[tauri::command]
fn open_folder(dir_path: &str) -> String {
    match file_sys::read_directory(&dir_path) {
        Ok(project) => serde_json::to_string(&project).unwrap(),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn get_file_content(file_path: &str) -> String {
    match file_sys::read_file(file_path) {
        Ok(content) => lib::format_response(&content, true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn create_file(file_path: &str) -> String {
    match file_sys::create_file(file_path) {
        Ok(()) => lib::format_response("", true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn rename_file(file_path: &str, new_file_path: &str) -> String {
    match file_sys::rename_file(file_path, new_file_path) {
        Ok(()) => lib::format_response("", true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn delete_file(file_path: &str) -> String {
    match file_sys::delete_file(file_path) {
        Ok(()) => lib::format_response("", true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn create_dir(dir_path: &str) -> String {
    match file_sys::create_dir(dir_path) {
        Ok(()) => lib::format_response("", true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn delete_dir(dir_path: &str) -> String {
    match file_sys::delete_dir(dir_path) {
        Ok(()) => lib::format_response("", true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

#[tauri::command]
fn write_file(file_path: &str, content: &str) -> String {
    match file_sys::write_file(file_path, content) {
        Ok(()) => lib::format_response("", true),
        Err(err) => lib::format_response(&err.to_string(), false)
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_folder, get_file_content, create_file, rename_file, delete_file, create_dir, delete_dir, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
