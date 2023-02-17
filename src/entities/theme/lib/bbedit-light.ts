import { bbedit as bbeditCode } from '@uiw/codemirror-theme-bbedit'
import { ITheme } from '@entities/theme/model/theme'

export const bbedit: ITheme = {
    name: 'Bbedit',
    theme: 'light',
    id: '6hyS4_q8CKoUopgWdbH50',
    body: {
        color: '#fff',
        background: '#fff',
        logoColor: '#1E1E1E',
    },
    borders: {
        size: '0',
        color: 'transparent',
    },
    modals: {
        background: '#252526',
        borders: {
            size: '1px',
            color: '#969696',
        },
        hover: {
            background: 'rgba(255, 255, 255, 0.1)',
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
            border: 'none',
            borderRight: '1px solid #252526',
            iconHover: {
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#969696',
            },
        },
        active: {
            color: '#fff',
            background: '#1E1E1E',
        },
        hover: {},
    },
    codemirror: bbeditCode,
}
