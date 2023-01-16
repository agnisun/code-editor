import { atom } from 'jotai'
import { IFile } from '@components/Navbar/Navbar'

export const projectPathAtom = atom<string>('')
export const projectDirectoriesAtom = atom<IFile[]>([])
export const projectFilesAtom = atom<IFile[]>([])
