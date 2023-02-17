import { vscodeDark as vscodeDarkCode } from '@uiw/codemirror-theme-vscode'
import { ITheme } from '@entities/theme/model/theme'

export type Extension = typeof vscodeDarkCode

export const vscodeDark: ITheme = {
    name: 'Vscode Dark',
    theme: 'dark',
    id: 'BpBPDgPDAmssvNnTuriDp',
    body: {
        color: '#fff',
        background: '#1E1E1E',
        logoColor: '#fff',
    },
    borders: {
        color: '#969696',
    },
    modals: {
        background: '#252526',
        borders: {
            color: '#969696',
        },
        hover: {
            background: 'rgba(37, 37, 38, 0.4)',
        },
        active: {
            background: '#37373D',
        },
    },
    navbar: {
        background: '#252526',
        hover: {
            background: 'rgba(37, 37, 38, 0.4)',
        },
        active: {
            background: '#37373D',
        },
    },
    titlebar: {
        background: '#323233',
    },
    toolsbar: {
        background: '#252526',
    },
    tabs: {
        background: '#252526',
        item: {
            color: '#969696',
            background: '#2D2D2D',
            iconHover: {
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#969696',
            },
        },
        active: {
            color: '#fff',
            background: '#1E1E1E',
        },
    },
    codemirror: vscodeDarkCode,
}
