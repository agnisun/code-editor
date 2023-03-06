import { IFileNode } from '@shared/types'

export const getParentIndex = (nodes: IFileNode[], childIndex: number, dirPath: string): number => {
    let parentIndex = -1

    for (let i = childIndex - 1; i >= 0; i--) {
        if (nodes[i].path === dirPath) {
            parentIndex = i
            break
        }
    }

    return parentIndex
}
