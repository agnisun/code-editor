import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { openedNodesAtom } from '@entities/source'
import { isFileExists } from '@shared/lib/is-file-exists'
import { createDir, createFile, readDirectory } from '@shared/lib/filesys'
import { formatDirectory } from '@shared/lib/format-directory'

export const useContextCreate = () => {
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const isCreateExists = useCallback(
        (parentPath: string, name: string, depth: number) => {
            return isFileExists(openedNodes, parentPath, name, depth)
        },
        [openedNodes]
    )

    const onCreate = useCallback(
        async (
            entity: { path: string; name: string; depth: number; kind: 'file' | 'directory'; index: number },
            dirPath: string
        ) => {
            const { name, depth, kind, path } = entity
            const { index, ...newNode } = entity

            if (isFileExists(openedNodes, dirPath, name, depth)) {
                throw new Error('This name is already exists')
            }

            if (!name.length) throw new Error('Name is empty')

            await (kind === 'file' ? createFile : createDir)(path)
            const dirFiles = formatDirectory(await readDirectory(dirPath + '/'))
            let startIndex = -1

            for (let i = 0; i < dirFiles.length; i++) {
                if (dirFiles[i].path === path) {
                    startIndex = i
                }
            }

            setOpenedNodes((openedNodes) => {
                openedNodes.splice(startIndex + index + 1, 0, newNode)
                return openedNodes
            })
        },
        [openedNodes]
    )

    return { onCreate, isCreateExists }
}
