use serde::{Deserialize, Serialize};
use std::{fs, io};
use std::path::Path;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct FileInfo {
    name: String,
    kind: String,
    path: String,
    id: String,
    children: Vec<FileInfo>
}

pub fn read_directory(dir_path: &str) -> Vec<FileInfo> {
    let new_path = Path::new(dir_path);
    let paths = fs::read_dir(new_path).unwrap();
    let mut files:Vec<FileInfo> = Vec::new();
    let mut directories:Vec<FileInfo> = Vec::new();
    
    for path in paths {
        let path_unwrap = path.unwrap();
        let meta = path_unwrap.metadata().unwrap();
        let mut file_children:Vec<FileInfo> = Vec::new(); 
        let file_name = match path_unwrap.file_name().into_string() {
            Ok(str) => str,
            Err(_error) => String::from("ERROR"),
        };
        let file_path = dir_path.to_owned() + &file_name + "/";
        let mut file_kind = String::from("file");
        
        if meta.is_dir() {
            file_kind = String::from("directory");
            file_children.append(&mut read_directory(&file_path));

            let new_file_info = FileInfo {
                name: file_name,
                kind: file_kind,
                children: file_children,
                path: file_path,
                id: Uuid::new_v4().to_string(),
            };
            
            directories.push(new_file_info);
        } else {
            let new_file_info = FileInfo {
                name: file_name,
                kind: file_kind,
                children: file_children,
                path: file_path,
                id: Uuid::new_v4().to_string(),
            };
            
            files.push(new_file_info);
        }
    }

    directories.append(&mut files);
    directories
}