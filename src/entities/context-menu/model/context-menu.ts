import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

interface IContextMenu {
    isActive: boolean
    pageX: number
    pageY: number
}

export interface IContextEntity {
    kind: string
    path: string
    id: string
    depth: number
    index?: number
}

interface IContextCreate {
    path: string
    name: string
    isActive: boolean
}

const initialCreate: IContextCreate = {
    path: '',
    name: '',
    isActive: false,
}

const initialEntity: IContextEntity = {
    kind: '',
    path: '',
    id: '',
    depth: 0,
    index: 0,
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
export const contextCreateAtom = atom<IContextCreate>(initialCreate)

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
