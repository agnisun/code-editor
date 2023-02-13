import { atom } from 'jotai'
import { IFile, IFileNode, IProject } from '@shared/types'

export const isLoadingAtom = atom<boolean>(false)
export const projectAtom = atom<IProject>({
    projectPath: '',
    directories: [],
    files: [],
})
export const openedNodesAtom = atom<IFileNode[]>([])
export const selectedFilesAtom = atom<IFile[]>([])
export const historyTabsAtom = atom<IFile[]>([])
