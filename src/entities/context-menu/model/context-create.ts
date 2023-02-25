import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'
import { openedNodesAtom } from '@entities/source'
import { IContextEntity } from '@entities/context-menu/model/context-menu'

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

export const contextCreateAtom = atom<IContextCreate>(initialCreate)

export const useContextCreate = () => {
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)
    const [contextCreate, setContextCreate] = useAtom(contextCreateAtom)

    const openCreateInput = useCallback((entity: IContextCreate) => {
        setContextCreate(entity)
    }, [])

    const closeCreateInput = useCallback(() => {
        setContextCreate(initialCreate)
    }, [])

    const onCreate = useCallback(async ({ node, newPath }: { node: IContextEntity; newPath: string }) => {}, [])

    return { onCreate, openCreateInput, closeCreateInput }
}
