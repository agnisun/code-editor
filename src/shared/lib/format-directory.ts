import { IDirectory, IFile, IFileNode, IProject } from '../types'

export const formatDirectory = (project: IProject, callback?: (node: IFileNode) => IFileNode): IFileNode[] => {
    const res: IFileNode[] = []
    const { directories, files } = project

    for (let i = 0; i < directories.length; i++) {
        let directory = directories[i]

        if (callback) {
            directory = callback(directory) as IDirectory
        }

        res.push(directory)
    }

    for (let i = 0; i < files.length; i++) {
        let file = files[i]

        if (callback) {
            file = callback(file) as IFile
        }

        res.push(file)
    }

    return res
}
