import { IFile } from '@shared/types'
import { FC, useEffect, useRef } from 'react'
import { basicSetup, EditorView } from 'codemirror'
import { useFiles } from '@entities/file'
import { Box } from '@chakra-ui/react'
import { readFile } from '@shared/lib/filesys'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'
import { baseStyleExtension } from '@entities/theme/lib/baseExtension'
import { language } from '@entities/code/lib/languages'

interface ViewProps {
    file: IFile
}

export const View: FC<ViewProps> = ({ file }) => {
    const { path, name } = file
    const { selectedFile } = useFiles()
    const [theme] = useAtom(themeAtom)
    const isRendered = useRef<number>(0)
    const editorRef = useRef<EditorView | null>(null)
    const visibility = selectedFile.path === path ? 'visible' : 'hidden'
    const height = selectedFile.path === path ? '100%' : '0'

    const updateEditorContent = async () => {
        const element = document.getElementById(path)

        if (element && isRendered.current === 0) {
            isRendered.current = 1
            const content = await readFile(selectedFile.path)
            const extensions = [basicSetup, theme.codemirror, baseStyleExtension]
            const ext = name.slice(name.lastIndexOf('.') + 1)
            const lang = language[ext]

            if (lang) extensions.push(lang())

            editorRef.current = new EditorView({
                doc: content,
                extensions,
                parent: element,
            })
        }
    }

    useEffect(() => {
        updateEditorContent()
    }, [selectedFile])

    return <Box as={'main'} id={path} visibility={visibility} height={height} />
}
