use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct FileInfo {
    id: String,
    name: String,
    kind: String,
    path: String,
}

pub fn read_directory(dir_path: &str) -> String {
    let new_path = Path::new(dir_path);
    let directory = fs::read_dir(new_path).unwrap();

    let mut entries: Vec<Vec<FileInfo>> = Vec::new();
    let mut files: Vec<FileInfo> = Vec::new();
    let mut directories: Vec<FileInfo> = Vec::new();

    for path in directory {
        let path_unwrap = path.unwrap();
        let meta = path_unwrap.metadata().unwrap();

        let kind = if meta.is_dir() {
            String::from("directory")
        } else {
            String::from("file")
        };
        
        let file_name = match path_unwrap.file_name().into_string() {
            Ok(str) => str,
            Err(error) => String::from("ERROR"),
        };
        let file_path = dir_path.to_owned() + &file_name;

        let new_file_info = FileInfo {
            id: Uuid::new_v4().to_string(),
            name: file_name,
            kind,
            path: file_path,
        };

        if meta.is_dir() {
            directories.push(new_file_info);
        } else {
            files.push(new_file_info);
        }
    }
    
    entries.push(files);
    entries.push(directories);

    let files_str = match serde_json::to_string(&entries) {
        Ok(str) => str,
        Err(error) => panic!("Problem opening the file: {:?}", error),
    };

    files_str
}