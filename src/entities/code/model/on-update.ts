import { EditorView, ViewUpdate } from '@codemirror/view'

type OnChange = (value: string) => void

export const onUpdate = (onChange: OnChange) => {
    return EditorView.updateListener.of((viewUpdate: ViewUpdate) => {
        if (viewUpdate.docChanged) {
            const doc = viewUpdate.state.doc
            const value = doc.toString()

            onChange(value)
        }
    })
}
