export const renamePath = (path: string, newPath: string): string => {
    return path.slice(0, path.lastIndexOf('/') + 1) + newPath
}
