import { invoke } from '@tauri-apps/api'

export const readDirectory = (dirPath: string): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        const data = (await invoke('open_folder', { dirPath })) as string
        const files = JSON.parse(data.replaceAll('\\', '/').replaceAll('//', '/'))
        resolve(files)
    })
}
