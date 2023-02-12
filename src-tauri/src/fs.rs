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
    collapsed: bool,
    depth: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct File {
    name: String,
    kind: String,
    path: String,
    id: String,
    depth: i32,
}

pub fn read_directory(dir_path: &str) -> Project {
    let new_path = Path::new(&dir_path);
    let paths = fs::read_dir(new_path).unwrap();
    let mut files:Vec<File> = Vec::new();
    let mut directories:Vec<Directory> = Vec::new();

    for entry in paths {
        let entry = entry.unwrap();
        let path = entry.path();

        let file_name = match entry.file_name().into_string() {
            Ok(str) => str,
            Err(_error) => String::from("ERROR"),
        };
        let file_path = dir_path.to_owned() + &file_name + "/";
        let mut file_kind = String::from("file");
        let file_id = Uuid::new_v4().to_string();
        
        if path.is_dir() {
            file_kind = String::from("directory");
            
            let directory = Directory {
                name: file_name,
                kind: file_kind,
                path: file_path,
                id:file_id,
                collapsed: true,
                depth: 0
            };

            directories.push(directory)
        } else {
            let file = File {
                name: file_name,
                kind: file_kind,
                path: file_path,
                id: file_id,
                depth: 0
            };

            files.push(file)
        }
    }

    Project {
        project_path: dir_path.to_owned(),
        directories,
        files,
    }
}

pub fn read_file(path: &str) -> String {
    let contents = fs::read_to_string(path).expect("ERROR");
    contents
}