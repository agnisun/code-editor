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
    children: Project
    depth: number
    collapsed: boolean
}

export interface File {
    name: string
    kind: 'file'
    path: string
    id: string
}

export const readDirectory = (dirPath: string): Promise<Project> => {
    return new Promise((resolve) => {
        invoke('open_folder', { dirPath }).then((data) => {
            const project = JSON.parse((data as string).replaceAll('\\', '/').replaceAll('//', '/'))
            resolve(project)
        })
    })
}
