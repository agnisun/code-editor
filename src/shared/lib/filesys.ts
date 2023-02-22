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

export const createFile = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        invoke('create_file', { filePath }).then((message: unknown) => {
            if (message === 'OK') {
                resolve()
            } else {
                reject()
            }
        })
    })
}

export const renameFile = (filePath: string, newFilePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        invoke('rename_file', { filePath, newFilePath }).then((message: unknown) => {
            if (message === 'OK') {
                resolve()
            } else {
                reject()
            }
        })
    })
}

export const deleteFile = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        invoke('delete_file', { filePath }).then((message: unknown) => {
            if (message === 'OK') {
                resolve(message)
            } else {
                reject(message)
            }
        })
    })
}

export const createDir = (dirPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        invoke('create_dir', { dirPath }).then((message: unknown) => {
            if (message === 'OK') {
                resolve()
            } else {
                reject()
            }
        })
    })
}

export const deleteDir = (dirPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        invoke('delete_dir', { dirPath }).then((message: unknown) => {
            if (message === 'OK') {
                resolve(message)
            } else {
                reject(message)
            }
        })
    })
}
