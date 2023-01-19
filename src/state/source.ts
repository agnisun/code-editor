import { atom } from 'jotai'
import { IFile } from '@components/Navbar/Navbar'

export const projectPathAtom = atom<string>('')
export const isLoadingAtom = atom<boolean>(false)
export const projectFilesAtom = atom<IFile[]>([])
