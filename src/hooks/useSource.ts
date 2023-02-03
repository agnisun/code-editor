import { useCallback, useMemo } from 'react'
import { useAtom } from 'jotai'
import { historyTabsAtom, openedNodesAtom, projectAtom, selectedFilesAtom } from '@state/source'
import { Directory, File, formatDirectory } from '@utils/filesys'

export const useSource = () => {
    const [selectedFiles, setSelectedFiles] = useAtom(selectedFilesAtom)
    const [project] = useAtom(projectAtom)
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)
    const [historyTabs, setHistoryTabs] = useAtom(historyTabsAtom)
    const selectedFile = useMemo<File>(
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

    const expandDirectory = useCallback(
        (directory: Directory, index: number) => {
            const children = formatDirectory(directory.children).map((file) => ({
                ...file,
                depth: directory.depth + 1,
            }))
            const res = JSON.parse(JSON.stringify(openedNodes))

            res.splice(index + 1, 0, ...children)

            res[index].collapsed = false
            setOpenedNodes(res)
        },
        [openedNodes]
    )

    const collapseDirectory = useCallback(
        (directory: Directory, index: number) => {
            const res = JSON.parse(JSON.stringify(openedNodes))
            let nextNodeIndex = res.length

            for (let i = index + 1; i < res.length; i++) {
                if (res[i].depth <= directory.depth) {
                    nextNodeIndex = i - 1
                    break
                }
            }

            res.splice(index + 1, nextNodeIndex - index)

            res[index].collapsed = true
            setOpenedNodes(res)
        },
        [openedNodes]
    )

    const collapseAllDirectories = useCallback(() => {
        const formattedFiles = formatDirectory(project)

        if (formattedFiles.length !== openedNodes.length) setOpenedNodes(formattedFiles)
    }, [openedNodes])

    const handleExpand = useCallback((directory: Directory, index: number) => {
        if (directory.collapsed) {
            expandDirectory(directory, index)
        } else {
            collapseDirectory(directory, index)
        }
    }, [])

    const selectFile = useCallback(
        (file: File, open?: boolean) => {
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
        [selectedFile]
    )

    const closeFile = useCallback((file: File) => {
        setSelectedFiles((selectedFiles) => selectedFiles.filter((el) => el.id !== file.id))
        setHistoryTabs((historyTabs) => historyTabs.filter((el) => el.id !== file.id))
    }, [])

    return { handleExpand, collapseAllDirectories, selectFile, closeFile, selectedFile }
}
