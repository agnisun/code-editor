import { useCallback } from 'react'
import { renameFile } from '@shared/lib/filesys'
import { atom, useAtom } from 'jotai'
import { openedNodesAtom } from '@entities/source'
import { IFileNode } from '@shared/types'
import { isFileExists } from '@shared/lib/is-file-exists'

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
        (parentPath: string, newName: string, depth: number): boolean => {
            return isFileExists(openedNodes, parentPath, newName, depth)
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
        async (entity: IRenameEntity, parentPath: string) => {
            const { newName, depth, path, newPath } = entity

            if (isFileExists(openedNodes, parentPath, newName, depth)) {
                throw new Error('This name is already exists')
            }

            await renameFile(path, newPath)
            // сделать с setOpenedNodes()
            setOpenedNodes((nodes) => {
                return nodes.map((node) => {
                    if (depth === node.depth) {
                        if (node.path === path) return { ...node, path: newPath, name: newName }
                    }

                    return node
                })
            })
        },
        [openedNodes]
    )

    return { openRenameInput, closeRenameInput, onRename, isRenameExists }
}
