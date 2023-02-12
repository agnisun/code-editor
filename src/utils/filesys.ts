import { invoke } from '@tauri-apps/api'

export interface Project {
    projectPath: string
    directories: Directory[]
    files: File[]
}

export interface Directory {
    name: string
    kind: 'directory'
    path: string
    id: string
    collapsed: boolean
    depth: number
}

export interface File {
    name: string
    kind: 'file'
    path: string
    id: string
    depth: number
}

export type OmitDirectory = Omit<Directory, 'kind' | 'collapsed'>
export interface FileNode extends OmitDirectory {
    kind: 'file' | 'directory'
    collapsed?: boolean
}

export const formatDirectory = (project: Project, callback?: (node: FileNode) => FileNode): FileNode[] => {
    const res: FileNode[] = []
    const { directories, files } = project

    for (let i = 0; i < directories.length; i++) {
        let directory = directories[i]

        if (callback) {
            directory = callback(directory) as Directory
        }

        res.push(directory)
    }

    for (let i = 0; i < files.length; i++) {
        let file = files[i]

        if (callback) {
            file = callback(file) as File
        }

        res.push(file)
    }

    return res
}

export const readDirectory = (dirPath: string): Promise<Project> => {
    return new Promise((resolve) => {
        invoke('open_folder', { dirPath }).then((data) => {
            const project = JSON.parse((data as string).replaceAll('\\', '/').replaceAll('//', '/'))
            resolve(project)
        })
    })
}

export const readFile = (filePath: string): Promise<string> => {
    return new Promise((resolve) => {
        invoke('get_file_content', { filePath }).then((data) => {
            resolve(data as string)
        })
    })
}
