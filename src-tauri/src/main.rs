#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod fc;
use std::{fs};

#[tauri::command]
fn open_folder(dir_path: &str) -> String {
    let files = fc::read_directory(&dir_path);
    let files_str = match serde_json::to_string(&files) {
        Ok(str) => str,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };

    files_str
}

#[tauri::command]
fn get_file_content(file_path: &str) -> String {
    let content = fc::read_file(file_path);
    content
}

#[tauri::command]
fn create_file(file_path: &str) -> String {
    match fs::File::create(file_path) {
        Ok(_ok) => String::from("OK"),
        Err(_err) => String::from("ERROR")
    }
}

#[tauri::command]
fn rename_file(file_path: &str, new_file_path: &str) -> String {
    match fs::rename(file_path, new_file_path) {
        Ok(_ok) => String::from("OK"),
        Err(_err) => String::from("ERROR")
    }
}

#[tauri::command]
fn delete_file(file_path: &str) -> String {
    match fs::remove_file(file_path) {
        Ok(_ok) => String::from("OK"),
        Err(_err) => String::from("ERROR")
    }
}

#[tauri::command]
fn create_dir(dir_path: &str) -> String {
    match fs::create_dir(dir_path) {
        Ok(_ok) => String::from("OK"),
        Err(_err) => String::from("ERROR")
    }
}

#[tauri::command]
fn delete_dir(dir_path: &str) -> String {
    match fs::remove_dir_all(dir_path) {
        Ok(_ok) => String::from("OK"),
        Err(_err) => String::from("ERROR")
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![open_folder, get_file_content, create_file, rename_file, delete_file, create_dir, delete_dir])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
