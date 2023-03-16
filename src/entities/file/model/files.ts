import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'
import { historyTabsAtom, selectedFilesAtom } from '@entities/source'
import { IFile } from '@shared/types'

export const useFiles = () => {
    const [selectedFiles, setSelectedFiles] = useAtom(selectedFilesAtom)
    const [historyTabs, setHistoryTabs] = useAtom(historyTabsAtom)
    const selectedFile = useMemo<IFile>(
        () =>
            historyTabs.at(-1) || {
                name: '',
                id: '',
                kind: 'file',
                depth: 0,
                path: '',
                parent: ''
            },
        [historyTabs]
    )

    const selectFile = useCallback(
        (file: IFile, open?: boolean) => {
            const addToHistory = () =>
                void setHistoryTabs((prev) => {
                    if (prev.at(-1)?.path !== file.path) return [...prev, file]

                    return prev
                })

            if (open) {
                addToHistory()
                return
            }

            for (let i = 0; i < selectedFiles.length; i++) {
                if (selectedFiles[i].path === file.path) {
                    if (selectedFile.path !== file.path) {
                        addToHistory()
                    }
                    return
                }
            }

            addToHistory()
            setSelectedFiles((prev) => [...prev, file])
        },
        [selectedFile, selectedFiles]
    )

    const closeFile = useCallback((file: IFile) => {
        setSelectedFiles((selectedFiles) => selectedFiles.filter((el) => el.path !== file.path))
        setHistoryTabs((historyTabs) => historyTabs.filter((el) => el.path !== file.path))
    }, [])

    return { selectFile, closeFile, selectedFile }
}
