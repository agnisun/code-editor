import { IFileNode } from '@shared/types'

export const updatePath = (newName: string) => {
    return (node: IFileNode) => {
        const path = node.path.split('/')
        path[path.length - node.depth] = newName

        const parent = node.parent.split('/')
        parent[parent.length - node.depth + 1] = newName

        node.path = path.join('/')
        node.parent = parent.join('/')

        return node
    }
}
