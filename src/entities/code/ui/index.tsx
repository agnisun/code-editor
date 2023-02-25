import { IFile } from '@shared/types'
import { FC, useEffect, useRef } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { useFiles } from '@entities/file'
import { javascript } from '@codemirror/lang-javascript'
import { Box } from '@chakra-ui/react'
import { readFile } from '@shared/lib/filesys'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'
import { baseExtension } from '@entities/theme/lib/baseExtension'

interface ViewProps {
    file: IFile
}

export const View: FC<ViewProps> = ({ file }) => {
    const { id, path } = file
    const { selectedFile } = useFiles()
    const [theme] = useAtom(themeAtom)
    const editorRef = useRef<EditorView | null>(null)
    const visibility = selectedFile.path === path ? 'visible' : 'hidden'
    const height = selectedFile.path === path ? '100%' : '0'

    const updateEditorContent = async () => {
        const element = document.getElementById(id)

        if (!element || selectedFile.path !== path) return

        const content = await readFile(selectedFile.path)

        editorRef.current = new EditorView({
            doc: content,
            extensions: [basicSetup, javascript(), theme.codemirror, baseExtension],
            parent: element,
        })
    }

    useEffect(() => {
        updateEditorContent()
    }, [selectedFile])

    return <Box as={'main'} id={id} visibility={visibility} height={height} />
}
