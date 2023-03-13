import { EditorView } from 'codemirror'

export const baseStyleExtension = EditorView.theme({
    '&': {
        height: '100%',
    },
    '.cm-scroller': {
        '&::-webkit-scrollbar': {
            paddingTop: '1px',
            width: '10px',
            height: '10px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.6)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgrey',
        },
    },
    '&.cm-focused': {
        outline: 'none !important',
    },
})
