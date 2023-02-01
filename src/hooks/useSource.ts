import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { openedNodesAtom, projectAtom } from '@state/source'
import { Directory, formatDirectory } from '@utils/filesys'

export const useSource = () => {
    const [project] = useAtom(projectAtom)
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const expandDirectory = useCallback(
        (directory: Directory, index: number) => {
            const children = formatDirectory(directory.children).map((file) => ({
                ...file,
                depth: directory.depth + 1,
            }))
            const res = openedNodes.slice()

            res.splice(index + 1, 0, ...children)

            directory.collapsed = false
            setOpenedNodes(res)
        },
        [openedNodes]
    )

    const collapseDirectory = useCallback(
        (directory: Directory, index: number) => {
            const res = openedNodes.slice()
            let nextNodeIndex = openedNodes.length

            for (let i = index + 1; i < openedNodes.length; i++) {
                if (openedNodes[i].depth <= directory.depth) {
                    nextNodeIndex = i - 1
                    break
                }
            }

            res.splice(index + 1, nextNodeIndex - index)

            directory.collapsed = true
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

    return { handleExpand, collapseAllDirectories }
}
