import { useCallback } from 'react'
import { deleteDir, deleteFile } from '@shared/lib/filesys'
import { useAtom } from 'jotai'
import { openedNodesAtom } from '@entities/source'
import { IContextEntity } from '@entities/context-menu/model/context-menu'

export const useDeleteFile = (onClose: () => void) => {
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const onDeleteFile = useCallback(async ({ path }: { path: string }) => {
        try {
            await deleteFile(path)
            setOpenedNodes((nodes) => {
                return nodes.filter((node) => node.path !== path)
            })
            onClose()
        } catch (e) {
            throw new Error(e as string)
        }
    }, [])

    const onDeleteDir = useCallback(
        async (entity: IContextEntity) => {
            const { path, index, depth } = entity

            try {
                await deleteDir(path)
                let nextNodeIndex = openedNodes.length

                for (let i = (index as number) + 1; i < openedNodes.length; i++) {
                    if (openedNodes[i].depth <= depth) {
                        nextNodeIndex = i - 1
                        break
                    }
                }

                setOpenedNodes((openedNodes) => {
                    const start = openedNodes.slice(0, index)
                    const end = openedNodes.slice(nextNodeIndex + 1)

                    return start.concat(end)
                })
            } catch (e) {
                throw new Error(e as string)
            }
        },
        [openedNodes]
    )

    return { onDeleteFile, onDeleteDir }
}
