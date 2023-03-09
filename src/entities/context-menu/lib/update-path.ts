import { IFileNode } from '@shared/types'

export const updatePath = (newName: string, newPath: string) => {
    return (node: IFileNode) => {
        const newPathLength = newPath.split('/').length
        const path = node.path.split('/')
        const parent = node.parent.split('/')

        path[newPathLength - 1] = newName
        parent[newPathLength - 1] = newName

        node.path = path.join('/')
        node.parent = parent.join('/')

        return node
    }
}
