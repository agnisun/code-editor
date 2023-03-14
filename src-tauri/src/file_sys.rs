use std::fs;
use std::path::Path;
use std::io::{Error};
use serde::{Deserialize, Serialize};

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
    parent: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct File {
    name: String,
    kind: String,
    path: String,
    depth: i32,
    parent: String,
}

pub fn read_directory(dir_path: &str) -> Result<Project, Error> {
    let new_path = Path::new(&dir_path);
    let paths = match fs::read_dir(new_path) {
        Ok(paths) => paths,
        Err(err) => return Err(err)
    };
    let mut files: Vec<File> = Vec::new();
    let mut directories: Vec<Directory> = Vec::new();

    for entry in paths {
        let entry = match entry {
            Ok(dir) => dir,
            Err(err) => return Err(err)
        };
        let entry_path = entry.path();
        let name = entry.file_name().into_string().expect("Error to convert OsString into a String");
        let path = dir_path.to_owned() + "/" + &name;
        let mut kind = String::from("file");
        let parent = dir_path.to_owned();

        if entry_path.is_dir() {
            kind = String::from("directory");

            let directory = Directory {
                name,
                kind,
                path,
                parent,
                expanded: false,
                depth: 0,
            };

            directories.push(directory)
        } else {
            let file = File {
                name,
                kind,
                path,
                parent,
                depth: 0,
            };

            files.push(file)
        }
    }

    let project = Project {
        project_path: dir_path.to_owned(),
        directories,
        files,
    };

    Ok(project)
}

pub fn create_file(file_path: &str) -> Result<(), Error> {
    match fs::File::create(file_path) {
        Ok(_file) => Ok(()),
        Err(err) => Err(err)
    }
}

pub fn read_file(path: &str) -> Result<String, Error> {
    match fs::read_to_string(&path) {
        Ok(file) => Ok(file),
        Err(err) => Err(err)
    }
}

pub fn write_file(path: &str, content: &str) -> Result<(), Error> {
    let file_path = Path::new(path);

    match fs::write(file_path, content) {
        Ok(()) => Ok(()),
        Err(err) => Err(err)
    }
}

pub fn rename_file(file_path: &str, new_file_path: &str) -> Result<(), Error> {
    match fs::rename(file_path, new_file_path) {
        Ok(()) => Ok(()),
        Err(err) => Err(err)
    }
}

pub fn delete_file(file_path: &str) -> Result<(), Error> {
    match fs::remove_file(file_path) {
        Ok(()) => Ok(()),
        Err(err) => Err(err)
    }
}

pub fn delete_dir(dir_path: &str) -> Result<(), Error> {
    match fs::remove_dir_all(dir_path) {
        Ok(()) => Ok(()),
        Err(err) => Err(err)
    }
}

pub fn create_dir(dir_path: &str) -> Result<(), Error> {
    match fs::create_dir(dir_path) {
        Ok(()) => Ok(()),
        Err(err) => Err(err)
    }
}
