import { IFileNode } from '@shared/types'

export const isFileExists = (nodes: IFileNode[], parentPath: string, name: string, depth: number): boolean => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.path === parentPath) {
            let index = i + 1

            while (nodes[index].depth >= depth && nodes[index]) {
                const currentNode = nodes[index]

                if (currentNode.depth === depth) {
                    if (currentNode.name.trim() === name.trim()) {
                        return true
                    }
                }
                index++
            }
            break
        }
    }

    return false
}
