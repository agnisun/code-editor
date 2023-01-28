use serde::{Deserialize, Serialize};
use std::{fs, io};
use std::path::Path;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
    project_path: String,
    directories: Vec<Directory>,
    files: Vec<File>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Directory {
    name: String,
    kind: String,
    path: String,
    id: String,
    children: Project,
    depth: i32,
    collapsed: bool
}

#[derive(Serialize, Deserialize, Debug)]
pub struct File {
    name: String,
    kind: String,
    path: String,
    id: String,
}

pub fn read_directory(dir_path: &str) -> Project {
    let new_path = Path::new(dir_path);
    let paths = fs::read_dir(new_path).unwrap();
    let mut files:Vec<File> = Vec::new();
    let mut directories:Vec<Directory> = Vec::new();
    
    for path in paths {
        let path_unwrap = path.unwrap();
        let meta = path_unwrap.metadata().unwrap();
        let file_name = match path_unwrap.file_name().into_string() {
            Ok(str) => str,
            Err(_error) => String::from("ERROR"),
        };
        let file_path = dir_path.to_owned() + &file_name + "/";
        let mut file_kind = String::from("file");
        let file_id = Uuid::new_v4().to_string();
        
        if meta.is_dir() {
            file_kind = String::from("directory");
            
            let directory = Directory {
                name: file_name,
                kind: file_kind,
                path: file_path.to_owned(),
                id: file_id,
                children: read_directory(&file_path),
                depth: 0,
                collapsed: false
            };
            
            directories.push(directory)
        } else {
            let file = File {
                name: file_name,
                kind: file_kind,
                path: file_path,
                id:file_id
            };
            
            files.push(file)
        }
    }

    Project {
        project_path: dir_path.to_owned(),
        directories,
        files
    }
}