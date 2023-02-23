import { useCallback } from 'react'
import { getFilenameByPath } from '@shared/lib/get-filename'
import { renameFile } from '@shared/lib/filesys'
import { atom, useAtom } from 'jotai'
import { openedNodesAtom } from '@entities/source'

interface IContextRename {
    path: string
    id: string
    name: string
    isActive: boolean
}

const initialRename: IContextRename = {
    id: '',
    name: '',
    path: '',
    isActive: false,
}

export const contextRenameAtom = atom<IContextRename>(initialRename)

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
        setContextRename(initialRename)
    }, [])

    const openRenameInput = useCallback((entity: IContextRename) => {
        setContextRename(entity)
    }, [])

    const onRename = useCallback(
        async ({ path, newPath, id, depth }: { path: string; newPath: string; id: string; depth: number }) => {
            const newName = getFilenameByPath(newPath)

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
                        if (node.id === id) return { ...node, path: newPath, name: newName }
                    }

                    return node
                })
            })
        },
        [openedNodes]
    )

    return { openRenameInput, closeRenameInput, onRename, isRenameExists }
}
