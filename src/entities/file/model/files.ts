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
            },
        [historyTabs]
    )

    const selectFile = useCallback(
        (file: IFile, open?: boolean) => {
            const addToHistory = () =>
                void setHistoryTabs((prev) => {
                    if (prev.at(-1)?.id !== file.id) return [...prev, file]

                    return prev
                })

            if (open) {
                addToHistory()
                return
            }

            for (let i = 0; i < selectedFiles.length; i++) {
                if (selectedFiles[i].id === file.id) {
                    if (selectedFile.id !== file.id) {
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
        setSelectedFiles((selectedFiles) => selectedFiles.filter((el) => el.id !== file.id))
        setHistoryTabs((historyTabs) => historyTabs.filter((el) => el.id !== file.id))
    }, [])

    return { selectFile, closeFile, selectedFile }
}
