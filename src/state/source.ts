import { atom } from 'jotai'
import { Directory, File, Project } from '@utils/filesys'

export const isLoadingAtom = atom<boolean>(false)
export const projectAtom = atom<Project>({
    projectPath: '',
    directories: [],
    files: [],
})
export const openedNodesAtom = atom<(File | Directory)[]>([])
export const selectedFilesAtom = atom<File[]>([])
export const historyTabsAtom = atom<File[]>([])
