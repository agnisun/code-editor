import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { openedNodesAtom } from '@entities/source'
import { isFileExists } from '@shared/lib/is-file-exists'
import { createDir, createFile } from '@shared/lib/filesys'
import { IFileNode } from '@shared/types'
import { getCurrentIndex } from '@entities/context-menu/lib/get-current-index'
import { getDirectoryChildsLength } from '@entities/context-menu/lib/get-directory-childs-length'

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

            try {
                await (kind === 'file' ? createFile : createDir)(path)
                const currentIndex = await getCurrentIndex(parent, path)

                const currentDepthNodes = openedNodes.filter((node, i) => {
                    return i >= index && node.depth === depth
                })

                let childNodesIndex = 0

                for (let i = 0; i < currentIndex; i++) {
                    const node = currentDepthNodes[i]
                    if (node.kind === 'directory' && node.expanded) {
                        childNodesIndex += getDirectoryChildsLength(openedNodes, node)
                    }
                }

                setOpenedNodes((openedNodes) => {
                    openedNodes.splice(index + currentIndex + childNodesIndex + 1, 0, entity)

                    return openedNodes
                })
            } catch (e) {
                throw new Error(e as string)
            }
        },
        [openedNodes]
    )

    return { onCreate, isCreateExists }
}
