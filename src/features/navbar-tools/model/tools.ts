import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { isLoadingAtom, openedNodesAtom, projectAtom } from '@entities/source'
import { open } from '@tauri-apps/api/dialog'
import { isHideAtom, navbarWidthAtom } from '@entities/navbar'
import { readDirectory } from '@shared/lib/filesys'
import { formatDirectory } from '@shared/lib/formatDirectory'

export const useTools = () => {
    const [, setNavbarWidth] = useAtom(navbarWidthAtom)
    const [, setIsHide] = useAtom(isHideAtom)
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
    const [project, setProject] = useAtom(projectAtom)
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)

    const loadProject = useCallback(async () => {
        const selected = await open({
            directory: true,
        })

        if (!selected) return

        if (!isLoading) setIsLoading(true)
        const project = await readDirectory(selected + '/')
        setProject(project)
        setOpenedNodes(formatDirectory(project))
        setIsLoading(false)
    }, [])

    const collapseAllDirectories = useCallback(() => {
        const formattedFiles = formatDirectory(project, (dir) => {
            if (dir.kind === 'directory') {
                dir.collapsed = true
            }

            return dir
        })

        if (formattedFiles.length !== openedNodes.length) {
            setOpenedNodes(formattedFiles)
        }
    }, [openedNodes])

    const hideNavbar = useCallback(() => {
        setNavbarWidth(50)
        setIsHide(true)
    }, [])

    const showNavbar = useCallback(() => {
        setNavbarWidth(190)
        setIsHide(false)
    }, [])

    return { loadProject, collapseAllDirectories, hideNavbar, showNavbar }
}
