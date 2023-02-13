import { invoke } from '@tauri-apps/api'
import { IProject } from '../types'

export const readDirectory = (dirPath: string): Promise<IProject> => {
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
