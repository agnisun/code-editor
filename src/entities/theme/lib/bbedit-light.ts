import { bbedit as bbeditCode } from '@uiw/codemirror-theme-bbedit'
import { ITheme } from '@entities/theme/model/theme'

export const bbedit: ITheme = {
    name: 'Bbedit',
    theme: 'light',
    id: '6hyS4_q8CKoUopgWdbH50',
    body: {
        color: '#1E1E1E',
        background: '#fff',
        logoColor: '#1E1E1E',
    },
    borders: {
        color: 'rgba(30, 30, 30, .5)',
    },
    modals: {
        background: '#FFFFFF',
        borders: {
            color: 'rgba(30, 30, 30, .5)',
        },
        active: {
            background: '#E5E5E5',
        },
        hover: {
            background: '#ECECEC',
        },
    },
    navbar: {
        background: '#F3F3F3',
        hover: {
            background: '#ECECEC',
        },
        active: {
            background: '#E5E5E5',
        },
    },
    titlebar: {
        background: '#E5E5E5',
    },
    toolsbar: {
        background: '#F3F3F3',
    },
    tabs: {
        background: '#F3F3F3',
        item: {
            color: 'rgba(30, 30, 30, 0.5)',
            background: '#ECECEC',
            iconHover: {
                background: 'rgba(55, 55, 55, 0.1)',
                color: '#1E1E1E',
            },
        },
        active: {
            color: '#1E1E1E',
            background: '#FFFFFF',
        },
    },
    codemirror: bbeditCode,
}
