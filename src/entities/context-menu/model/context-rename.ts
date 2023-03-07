import { useCallback } from 'react'
import { renameFile } from '@shared/lib/filesys'
import { atom, useAtom } from 'jotai'
import { historyTabsAtom, openedNodesAtom, selectedFilesAtom } from '@entities/source'
import { IFile, IFileNode } from '@shared/types'
import { isFileExists } from '@shared/lib/is-file-exists'
import { getCurrentIndex } from '@entities/context-menu/lib/get-current-index'
import { getParentIndex } from '@entities/context-menu/lib/get-parent-index'
import { updatePath } from '@entities/context-menu/lib/update-path'

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
    const [historyTabs, setHistoryTabs] = useAtom(historyTabsAtom)
    const [selectedFiles, setSelectedFiles] = useAtom(selectedFilesAtom)
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

    const updateOpenedNodes = useCallback(
        async (entity: IRenameEntity, index: number) => {
            const { newName, depth, path, newPath, parent, kind, expanded } = entity

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

                    const updateCb = updatePath(newName)
                    const dirContent = newNodes.splice(index, endIndex).map(updateCb)
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

    const updateSelectedFiles = (entity: IRenameEntity, newName: string) => {
        const { path } = entity
        const files = selectedFiles.filter((file) => file.path.slice(0, path.length) === path)

        if (!files.length) return
        const updateCb = updatePath(newName)

        setSelectedFiles((selectedFiles) => {
            return selectedFiles.map((file) => {
                if (files.some((el) => el.path === file.path)) {
                    return updateCb(file) as IFile
                }

                return file
            })
        })
    }

    const updateHistoryFiles = (entity: IRenameEntity, newName: string) => {
        const { path } = entity

        const files = historyTabs.filter((file) => file.path.slice(0, path.length) === path)

        if (!files.length) return

        const updateCb = updatePath(newName)

        setHistoryTabs((historyTabs) => {
            return historyTabs.map((file) => {
                if (files.some((el) => el.path === file.path)) {
                    return updateCb(file) as IFile
                }

                return file
            })
        })
    }

    const onRename = useCallback(
        async (entity: IRenameEntity, index: number) => {
            const { newName, depth, path, newPath, parent, name } = entity

            if (isFileExists(openedNodes, { parentPath: parent, name, newName, depth })) {
                throw new Error('This name is already exists')
            }

            await renameFile(path, newPath)

            updateOpenedNodes(entity, index)
            updateSelectedFiles(entity, newName)
            updateHistoryFiles(entity, newName)
        },
        [openedNodes, selectedFiles]
    )

    return { openRenameInput, closeRenameInput, onRename, isRenameExists }
}