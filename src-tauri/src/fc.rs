use serde::{Deserialize, Serialize};
use std::{fs};
use std::path::Path;

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
    expanded: bool,
    depth: i32,
    parent: String
}

#[derive(Serialize, Deserialize, Debug)]
pub struct File {
    name: String,
    kind: String,
    path: String,
    depth: i32,
    parent: String
}

pub fn read_directory(dir_path: &str) -> Project {
    let new_path = Path::new(&dir_path);
    let paths = fs::read_dir(new_path).unwrap();
    let mut files:Vec<File> = Vec::new();
    let mut directories:Vec<Directory> = Vec::new();

    for entry in paths {
        let entry = entry.unwrap();
        let entry_path = entry.path();

        let name = match entry.file_name().into_string() {
            Ok(str) => str,
            Err(_error) => String::from("ERROR"),
        };
        let path = dir_path.to_owned() + &name;
        let mut kind = String::from("file");
        let mut parent = dir_path.to_owned();
        parent.pop();
        
        if entry_path.is_dir() {
            kind = String::from("directory");
            
            let directory = Directory {
                name,
                kind,
                path,
                parent,
                expanded: false,
                depth: 0
            };

            directories.push(directory)
        } else {
            let file = File {
                name,
                kind,
                path,
                parent,
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