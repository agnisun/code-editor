import { invoke } from '@tauri-apps/api'
import { IFile } from '@components/Navbar/Navbar'

export const readDirectory = (dirPath: string): Promise<IFile[]> => {
    return new Promise((resolve) => {
        invoke('open_folder', { dirPath }).then((data) => {
            const files = JSON.parse((data as string).replaceAll('\\', '/').replaceAll('//', '/'))
            resolve(files)
        })
    })
}
