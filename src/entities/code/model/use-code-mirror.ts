import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { markdown } from '@codemirror/lang-markdown'
import { cpp } from '@codemirror/lang-cpp'
import { php } from '@codemirror/lang-php'
import { xml } from '@codemirror/lang-xml'
import { rust } from '@codemirror/lang-rust'
import { LanguageSupport } from '@codemirror/language'
import { useEffect, useRef, useState } from 'react'
import { basicSetup } from 'codemirror'
import { EditorView, keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'
import { IFile } from '@shared/types'
import { readFile } from '@shared/lib/filesys'
import { baseStyleExtension, Extension } from '@entities/code/lib/base-style-extension'

interface ILanguage {
    [key: string]: () => LanguageSupport
}

export const language: ILanguage = {
    js: javascript,
    jsx: () =>
        javascript({
            jsx: true,
        }),
    ts: () =>
        javascript({
            typescript: true,
        }),
    tsx: () =>
        javascript({
            typescript: true,
            jsx: true,
        }),
    java: java,
    html: html,
    css: css,
    md: markdown,
    cpp: cpp,
    php: php,
    xml: xml,
    rs: rust,
}

export const useCodeMirror = (file: IFile, extensions: Extension[]) => {
    const { name, path } = file
    const [theme] = useAtom(themeAtom)
    const isRendered = useRef<boolean>(false)
    const editorRef = useRef<EditorView | null>(null)
    const [error, setError] = useState<string>('')

    const updateEditorContent = async () => {
        const element = document.getElementById(path)

        if (element && !isRendered.current) {
            isRendered.current = true

            try {
                const content = await readFile(path)
                const baseExtensions = [
                    basicSetup,
                    theme.codemirror,
                    baseStyleExtension,
                    keymap.of([indentWithTab]),
                    ...extensions,
                ]
                const ext = name.slice(name.lastIndexOf('.') + 1)
                const lang = language[ext]

                if (lang) baseExtensions.push(lang())

                editorRef.current = new EditorView({
                    doc: content,
                    extensions: baseExtensions,
                    parent: element,
                })
                setError('')
            } catch (e) {
                console.error(e)
                setError(e as string)
            }
        }
    }

    useEffect(() => {
        updateEditorContent()

        return () => {
            editorRef.current?.destroy()
        }
    }, [])

    return { error }
}
