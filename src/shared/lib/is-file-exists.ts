import { IFileNode } from '@shared/types'

export const isFileExists = (
    nodes: IFileNode[],
    file: {
        parentPath: string
        name?: string
        newName: string
        depth: number
    }
): boolean => {
    const { newName, parentPath, name, depth } = file
    if (!newName.trim().length) return true

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.path === parentPath) {
            let index = i + 1

            while (nodes[index] && nodes[index].depth >= depth) {
                const currentNode = nodes[index]

                if (currentNode.depth === depth) {
                    if (name) {
                        if (currentNode.name !== name && currentNode.name === newName.trim()) {
                            return true
                        }
                    } else {
                        if (currentNode.name === newName.trim()) {
                            return true
                        }
                    }
                }
                index++
            }
            break
        }
    }

    return false
}
