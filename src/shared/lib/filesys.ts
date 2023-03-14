import { invoke } from '@tauri-apps/api'
import { IProject } from '../types'

interface Response {
    status: boolean
    data: string
}

export const readDirectory = (dirPath: string): Promise<IProject> => {
    return new Promise((resolve, reject) => {
        invoke('open_folder', { dirPath }).then((result) => {
            const resultParse = JSON.parse(result as string)

            if (resultParse?.status) reject(resultParse.data)

            const project = JSON.parse(JSON.stringify(resultParse).replaceAll('\\', '/').replaceAll('//', '/'))

            resolve(project)
        })
    })
}

export const readFile = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        invoke('get_file_content', { filePath }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve(data)
            else reject(data)
        })
    })
}

export const writeFile = (filePath: string, content: string): Promise<void | string> => {
    return new Promise((resolve, reject) => {
        invoke('write_file', { filePath, content }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve()
            else reject(data)
        })
    })
}

export const createFile = (filePath: string): Promise<void | string> => {
    return new Promise((resolve, reject) => {
        invoke('create_file', { filePath }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve()
            else reject(data)
        })
    })
}

export const renameFile = (filePath: string, newFilePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        invoke('rename_file', { filePath, newFilePath }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve()
            else reject(data)
        })
    })
}

export const deleteFile = (filePath: string): Promise<void | string> => {
    return new Promise((resolve, reject) => {
        invoke('delete_file', { filePath }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve()
            else reject(data)
        })
    })
}

export const createDir = (dirPath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        invoke('create_dir', { dirPath }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve()
            else reject(data)
        })
    })
}

export const deleteDir = (dirPath: string): Promise<void | string> => {
    return new Promise((resolve, reject) => {
        invoke('delete_dir', { dirPath }).then((result) => {
            const { status, data } = JSON.parse(result as string) as Response

            if (status) resolve()
            else reject(data)
        })
    })
}
