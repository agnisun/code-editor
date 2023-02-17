import { atom } from 'jotai'
import { CSSProperties } from 'react'
import { Extension, vscodeDark } from '@entities/theme/lib/vscode-dark'
import { bbedit } from '@entities/theme/lib/bbedit-light'

export const themes: ITheme[] = [vscodeDark, bbedit]

export interface ITheme {
    name: string
    theme: 'dark' | 'light'
    id: string
    body: {
        color: string
        background: string
        logoColor: string
    }
    modals: {
        background: string
        borders: {
            size: string
            color: string
        }
        hover: CSSProperties
    }
    borders: {
        size: string
        color: string
    }
    titlebar: {
        background: string
    }
    toolsbar: {
        background: string
    }
    navbar: {
        background: string
        hover: CSSProperties
        active: CSSProperties
    }
    tabs: {
        background: string
        item: {
            color: string
            background: string
            border: string
            borderRight?: string
            iconHover?: CSSProperties
        }
        hover: CSSProperties
        active: CSSProperties
    }
    codemirror: Extension
}

export const themeAtom = atom<ITheme>(vscodeDark)
