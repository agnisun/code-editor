export interface IProject {
    project_path: string
    directories: IDirectory[]
    files: IFile[]
}

export interface IDirectory {
    name: string
    kind: 'directory'
    path: string
    expanded: boolean
    depth: number
}

export interface IFile {
    name: string
    kind: 'file'
    path: string
    depth: number
}

export type OmitDirectory = Omit<IDirectory, 'kind' | 'expanded'>
export interface IFileNode extends OmitDirectory {
    kind: 'file' | 'directory'
    expanded?: boolean
}
