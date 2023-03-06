import { useCallback } from 'react'
import { renameFile } from '@shared/lib/filesys'
import { atom, useAtom } from 'jotai'
import { openedNodesAtom } from '@entities/source'
import { IFileNode } from '@shared/types'
import { isFileExists } from '@shared/lib/is-file-exists'
import { getCurrentIndex } from '@entities/context-menu/lib/get-current-index'
import { getParentIndex } from '@entities/context-menu/lib/get-parent-index'

interface IContextRename {
    isActive: boolean
    path: string
}

interface IRenameEntity extends IFileNode {
    newPath: string
    newName: string
}

const initialContextRename = {
    isActive: false,
    path: '',
}

export const contextRenameAtom = atom<IContextRename>(initialContextRename)

export const useContextRename = () => {
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)
    const [, setContextRename] = useAtom(contextRenameAtom)

    const isRenameExists = useCallback(
        (parentPath: string, name: string, newName: string, depth: number): boolean => {
            return isFileExists(openedNodes, { parentPath, name, newName, depth })
        },
        [openedNodes]
    )

    const closeRenameInput = useCallback(() => {
        setContextRename(initialContextRename)
    }, [])

    const openRenameInput = useCallback(({ path }: { path: string }) => {
        setContextRename({ path, isActive: true })
    }, [])

    const onRename = useCallback(
        async (entity: IRenameEntity, index: number) => {
            const { newName, depth, path, newPath, parent, name, kind, expanded } = entity

            if (isFileExists(openedNodes, { parentPath: parent, name, newName, depth })) {
                throw new Error('This name is already exists')
            }

            await renameFile(path, newPath)

            const startIndex = await getCurrentIndex(parent + '/', newPath)
            const parentIndex = getParentIndex(openedNodes, index, parent)

            setOpenedNodes((openedNodes) => {
                const newNode: IFileNode = {
                    name: newName,
                    path: newPath,
                    expanded,
                    depth,
                    kind,
                    parent,
                }

                const newNodes = openedNodes.filter((node) => node.path !== path)

                if (kind === 'directory' && expanded) {
                    let endIndex = 0

                    while (newNodes[index + endIndex].depth > depth) {
                        endIndex++
                    }

                    const dirContent = newNodes.splice(index, endIndex).map((node) => {
                        const path = node.path.split('/')
                        path[path.length - node.depth] = newName

                        const parent = node.parent.split('/')
                        parent[parent.length - node.depth + 1] = newName

                        node.path = path.join('/')
                        node.parent = parent.join('/')

                        return node
                    })
                    dirContent.unshift(newNode)
                    newNodes.splice(parentIndex + startIndex + 1, 0, ...dirContent)
                } else {
                    newNodes.splice(parentIndex + startIndex + 1, 0, newNode)
                }

                return newNodes
            })
        },
        [openedNodes]
    )

    return { openRenameInput, closeRenameInput, onRename, isRenameExists }
}
