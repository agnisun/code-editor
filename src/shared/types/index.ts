export interface IProject {
    project_path: string
    directories: IDirectory[]
    files: IFile[]
}

export interface IDirectory {
    name: string
    kind: 'directory'
    path: string
    id: string
    collapsed: boolean
    depth: number
}

export interface IFile {
    name: string
    kind: 'file'
    path: string
    id: string
    depth: number
}

export type OmitDirectory = Omit<IDirectory, 'kind' | 'collapsed'>
export interface IFileNode extends OmitDirectory {
    kind: 'file' | 'directory'
    collapsed?: boolean
}
