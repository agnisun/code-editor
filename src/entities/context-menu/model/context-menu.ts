import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'
import { IFileNode } from '@shared/types'
import { projectAtom } from '@entities/source'

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
    depth: 0,
    parent: '',
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
    const [project] = useAtom(projectAtom)
    const [, setContextEntity] = useAtom(contextEntityAtom)
    const [, setContextMenu] = useAtom(contextMenuAtom)

    const onOpen = useCallback((entity: IContextEntity, menu: IContextMenu) => {
        const { kind, path } = entity
        const { pageY } = menu
        const menuSize = kind === 'file' || project.project_path === path ? menuFileSize : menuDirectorySize

        if (menu.pageY + menuSize + 20 > window.innerHeight) {
            menu.pageY = pageY - (menuSize === 120 ? 140 : 80)
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
