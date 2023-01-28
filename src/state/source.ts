import { atom } from 'jotai'
import { Project } from '@utils/filesys'

export const isLoadingAtom = atom<boolean>(false)
export const projectAtom = atom<Project>({
    projectPath: '',
    directories: [],
    files: [],
})
