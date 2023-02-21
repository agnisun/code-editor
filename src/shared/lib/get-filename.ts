export const getFilenameByPath = (path: string): string => {
    return path.slice(path.lastIndexOf('/') + 1)
}
