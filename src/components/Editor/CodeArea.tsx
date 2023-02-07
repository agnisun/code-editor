import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useSource } from '@hooks/useSource'
import { basicSetup, EditorView } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { InitialCodeArea } from '@components/Editor/InitialCodeArea'
import { readFile } from '@utils/filesys'
import { materialDark } from 'cm6-theme-material-dark'

export const CodeArea = () => {
    const { selectedFile } = useSource()
    const editorRef = useRef<EditorView | null>(null)

    const updateEditorContent = async () => {
        const element = document.getElementById('code-editor')

        if (!element || !selectedFile.path) return

        const content = await readFile(selectedFile.path.slice(0, -1))
        const baseTheme = EditorView.theme({
            '&': {
                height: '100%',
            },
        })

        editorRef.current = new EditorView({
            doc: content,
            extensions: [basicSetup, javascript(), materialDark, baseTheme],
            parent: element,
        })
    }

    useEffect(() => {
        updateEditorContent()
        return () => editorRef.current?.destroy()
    }, [selectedFile])

    return selectedFile.path ? <Box id={'code-editor'} w={'100%'} h={'100%'} /> : <InitialCodeArea />
}
