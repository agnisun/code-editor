import { IFile } from '@shared/types'
import { FC, useEffect, useRef } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { useFiles } from '@entities/file'
import { javascript } from '@codemirror/lang-javascript'
import { materialDark } from 'cm6-theme-material-dark'
import { Box } from '@chakra-ui/react'
import { readFile } from '@shared/lib/filesys'

interface ViewProps {
    file: IFile
}

export const View: FC<ViewProps> = ({ file }) => {
    const { id } = file
    const { selectedFile } = useFiles()
    const editorRef = useRef<EditorView | null>(null)
    const visibility = selectedFile.id === id ? 'visible' : 'hidden'
    const height = selectedFile.id === id ? '100%' : '0'

    const updateEditorContent = async () => {
        const element = document.getElementById(id)
        
        if (!element || selectedFile.id !== id) return

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

    return <Box as={'main'} id={id} visibility={visibility} height={height} />
}
