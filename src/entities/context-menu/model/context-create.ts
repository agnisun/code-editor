import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { openedNodesAtom } from '@entities/source'
import { isFileExists } from '@shared/lib/is-file-exists'
import { createDir, createFile } from '@shared/lib/filesys'
import { IFileNode } from '@shared/types'
import { getCurrentIndex } from '@entities/context-menu/lib/get-current-index'

export const useContextCreate = () => {
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const isCreateExists = useCallback(
        (parentPath: string, name: string, depth: number) => {
            return isFileExists(openedNodes, { parentPath, depth, newName: name })
        },
        [openedNodes]
    )

    const onCreate = useCallback(
        async (entity: IFileNode, index: number) => {
            const { name, depth, kind, path, parent } = entity

            if (isFileExists(openedNodes, { parentPath: parent, depth, newName: name })) {
                throw new Error('This name is already exists')
            }

            await (kind === 'file' ? createFile : createDir)(path)
            let startIndex = (await getCurrentIndex(parent + '/', path)) + index

            while (openedNodes[startIndex].depth > depth) startIndex++

            setOpenedNodes((openedNodes) => {
                openedNodes.splice(startIndex + 1, 0, entity)
                return openedNodes
            })
        },
        [openedNodes]
    )

    return { onCreate, isCreateExists }
}
