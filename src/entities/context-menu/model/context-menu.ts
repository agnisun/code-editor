import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'
import { deleteDir, deleteFile } from '@shared/lib/filesys'
import { openedNodesAtom } from '@entities/source'

interface IContextMenu {
    isActive: boolean
    pageX: number
    pageY: number
}

interface IContextEntity {
    kind: string
    path: string
    id: string
    depth: number
    index?: number
}

const initialEntity = {
    kind: '',
    path: '',
    id: '',
    depth: 0,
    index: 0,
}
const initialMenu = {
    isActive: false,
    pageX: 0,
    pageY: 0,
}

const menuFileSize = 60
const menuDirectorySize = 120

export const contextEntityAtom = atom<IContextEntity>(initialEntity)

export const contextMenuAtom = atom<IContextMenu>(initialMenu)

export const useContextMenu = () => {
    const [, setContextEntity] = useAtom(contextEntityAtom)
    const [, setContextMenu] = useAtom(contextMenuAtom)
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const onOpen = useCallback((entity: IContextEntity, menu: IContextMenu) => {
        const { kind } = entity
        const { pageY } = menu
        const menuSize = kind === 'file' ? menuFileSize : menuDirectorySize

        if (menu.pageY + menuSize + 20 > window.innerHeight) {
            menu.pageY = pageY - 80
        }

        setContextEntity(entity)
        setContextMenu(menu)
    }, [])

    const onClose = useCallback(() => {
        setContextEntity(initialEntity)
        setContextMenu(initialMenu)
    }, [])

    const onDeleteFile = useCallback(async ({ path }: { path: string }) => {
        try {
            await deleteFile(path)
            setOpenedNodes((nodes) => {
                return nodes.filter((node) => node.path !== path)
            })
            onClose()
        } catch (e) {
            console.log(e)
        }
    }, [])

    const onDeleteDir = useCallback(
        async (entity: IContextEntity) => {
            const { path, index, depth } = entity

            try {
                await deleteDir(path)
                let nextNodeIndex = openedNodes.length

                for (let i = (index as number) + 1; i < openedNodes.length; i++) {
                    if (openedNodes[i].depth <= depth) {
                        nextNodeIndex = i - 1
                        break
                    }
                }

                setOpenedNodes((openedNodes) => {
                    const start = openedNodes.slice(0, index)
                    const end = openedNodes.slice(nextNodeIndex + 1)

                    return start.concat(end)
                })
            } catch (e) {
                console.log(e)
            }
        },
        [openedNodes]
    )

    return { onOpen, onClose, onDeleteFile, onDeleteDir }
}
