import { useCallback } from 'react'
import { renameFile } from '@shared/lib/filesys'
import { atom, useAtom } from 'jotai'
import { openedNodesAtom } from '@entities/source'
import { IFileNode } from '@shared/types'

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
        (newName: string, depth: number): boolean => {
            for (let i = 0; i < openedNodes.length; i++) {
                const node = openedNodes[i]
                if (node.depth === depth) {
                    if (node.name === newName) {
                        return true
                    }
                }
            }

            return false
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
        async (entity: IRenameEntity) => {
            const { newName, depth, path, newPath } = entity

            for (let i = 0; i < openedNodes.length; i++) {
                const node = openedNodes[i]
                if (node.depth === depth) {
                    if (node.name === newName) {
                        throw new Error('This name is already exists')
                    }
                }
            }

            await renameFile(path, newPath)
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
