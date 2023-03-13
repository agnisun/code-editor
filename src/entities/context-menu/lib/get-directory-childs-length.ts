import { IFileNode } from '@shared/types'

export const getDirectoryChildsLength = (nodes: IFileNode[], directory: IFileNode) => {
    const { depth, path } = directory
    let childs = 0

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]

        if (node.path === path) {
            let index = i + 1

            while (nodes[index] && nodes[index].depth > depth) {
                index++
                childs++
            }

            break
        }
    }

    return childs
}
