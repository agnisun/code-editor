import { useCallback } from 'react'
import { IDirectory } from '@shared/types'
import { useAtom } from 'jotai'
import { openedNodesAtom } from '@entities/source'
import { formatDirectory } from '@shared/lib/format-directory'
import { readDirectory } from '@shared/lib/filesys'

export const useDirectories = () => {
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const expandDirectory = useCallback(async (directory: IDirectory, index: number) => {
        const children = await readDirectory(directory.path)
        setOpenedNodes((openedNodes) => {
            openedNodes[index].expanded = true
            const start = openedNodes.slice(0, index + 1)
            const end = openedNodes.slice(index + 1)
            const formattedChildren = formatDirectory(children, (file) => ({
                ...file,
                depth: directory.depth + 1,
            }))

            return start.concat(formattedChildren, end)
        })
    }, [])

    const collapseDirectory = useCallback(
        (directory: IDirectory, index: number) => {
            let nextNodeIndex = openedNodes.length

            for (let i = index + 1; i < openedNodes.length; i++) {
                if (openedNodes[i].depth <= directory.depth) {
                    nextNodeIndex = i - 1
                    break
                }
            }

            setOpenedNodes((openedNodes) => {
                openedNodes[index].expanded = false
                const start = openedNodes.slice(0, index + 1)
                const end = openedNodes.slice(nextNodeIndex + 1)

                return start.concat(end)
            })
        },
        [openedNodes]
    )

    const handleExpand = useCallback((directory: IDirectory, index: number) => {
        if (!directory.expanded) {
            expandDirectory({ ...directory }, index)
        } else {
            collapseDirectory({ ...directory }, index)
        }
    }, [])

    return { handleExpand }
}
