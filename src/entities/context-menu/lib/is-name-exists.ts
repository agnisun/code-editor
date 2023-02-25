import { IFileNode } from '@shared/types'

export const isNameExists = (nodes: IFileNode[], name: string, depth: number): boolean => {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.depth === depth) {
            if (node.name === name) {
                return true
            }
        }
    }

    return false
}
