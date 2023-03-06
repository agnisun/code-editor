import { formatDirectory } from '@shared/lib/format-directory'
import { readDirectory } from '@shared/lib/filesys'

export const getCurrentIndex = async (dirPath: string, path: string): Promise<number> => {
    const dirFiles = formatDirectory(await readDirectory(dirPath + '/'))
    let startIndex = -1

    for (let i = 0; i < dirFiles.length; i++) {
        if (dirFiles[i].path === path) {
            startIndex = i
        }
    }

    return startIndex
}
