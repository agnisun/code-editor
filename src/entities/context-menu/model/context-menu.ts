import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'
import { IFileNode } from '@shared/types'

interface IContextMenu {
    isActive: boolean
    pageX: number
    pageY: number
}

export interface IContextEntity extends IFileNode {
    index?: number
}

const initialEntity: IContextEntity = {
    index: 0,
    kind: 'file',
    name: '',
    path: '',
    id: '',
    depth: 0,
}
const initialMenu: IContextMenu = {
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

    return { onOpen, onClose }
}
