import { useCallback } from 'react'
import { renameFile } from '@shared/lib/filesys'
import { atom, useAtom } from 'jotai'
import { historyTabsAtom, openedNodesAtom, selectedFilesAtom } from '@entities/source'
import { IFile, IFileNode } from '@shared/types'
import { isFileExists } from '@shared/lib/is-file-exists'
import { getCurrentIndex } from '@entities/context-menu/lib/get-current-index'
import { getParentIndex } from '@entities/context-menu/lib/get-parent-index'
import { updatePath } from '@entities/context-menu/lib/update-path'
import { getDirectoryChildsLength } from '@entities/context-menu/lib/get-directory-childs-length'

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

    const updateOpenedNodes = async (entity: IRenameEntity, index: number) => {
        const { newName, depth, path, newPath, parent, kind, expanded } = entity

        try {
            const currentIndex = await getCurrentIndex(parent, newPath)
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
                const currentDepthNodes = newNodes.filter((node, i) => {
                    return i >= parentIndex && node.depth === depth
                })

                let childNodesIndex = 0

                for (let i = 0; i < currentIndex; i++) {
                    const node = currentDepthNodes[i]
                    if (node.kind === 'directory' && node.expanded) {
                        childNodesIndex += getDirectoryChildsLength(openedNodes, node)
                    }
                }

                if (kind === 'directory' && expanded) {
                    const endDirIndex = getDirectoryChildsLength(openedNodes, entity)
                    const updateCb = updatePath(newName, newPath)
                    const dirContent = newNodes.splice(index, endDirIndex).map(updateCb)

                    dirContent.unshift(newNode)
                    newNodes.splice(currentIndex + parentIndex + childNodesIndex + 1, 0, ...dirContent)
                } else {
                    newNodes.splice(currentIndex + parentIndex + childNodesIndex + 1, 0, newNode)
                }

                return newNodes
            })
        } catch (e) {
            throw new Error(e as string)
        }
    }

    const updateSelectedFiles = (entity: IRenameEntity) => {
        const { path, newPath, newName } = entity
        const files = selectedFiles.filter((file) => file.path.slice(0, path.length) === path)

        if (!files.length) return
        const updateCb = updatePath(newName, newPath)

        setSelectedFiles((selectedFiles) => {
            return selectedFiles.map((file) => {
                if (files.some((el) => el.path === file.path)) {
                    if (path === file.path) file.name = newName

                    return updateCb(file) as IFile
                }

                return file
            })
        })
    }

    const updateHistoryFiles = (entity: IRenameEntity) => {
        const { path, newPath, newName } = entity

        const files = historyTabs.filter((file) => file.path.slice(0, path.length) === path)

        if (!files.length) return

        const updateCb = updatePath(newName, newPath)

        setHistoryTabs((historyTabs) => {
            return historyTabs.map((file) => {
                if (files.some((el) => el.path === file.path)) {
                    if (path === file.path) file.name = newName

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

            try {
                await renameFile(path, newPath)

                updateOpenedNodes(entity, index)
                updateSelectedFiles(entity)
                updateHistoryFiles(entity)
            } catch (e) {
                throw new Error(e as string)
            }
        },
        [openedNodes, selectedFiles, historyTabs]
    )

    return { openRenameInput, closeRenameInput, onRename, isRenameExists }
}
