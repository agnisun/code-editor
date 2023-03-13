import { useCallback } from 'react'
import { useAtom } from 'jotai'
import { historyTabsAtom, isLoadingAtom, openedNodesAtom, projectAtom, selectedFilesAtom } from '@entities/source'
import { open } from '@tauri-apps/api/dialog'
import { isHideAtom, navbarWidthAtom, prevNavbarWidthAtom } from '@entities/navbar'
import { readDirectory } from '@shared/lib/filesys'
import { formatDirectory } from '@shared/lib/format-directory'

export const useTools = () => {
    const [navbarWidth, setNavbarWidth] = useAtom(navbarWidthAtom)
    const [prevNavbarWidth, setPrevNavbarWidth] = useAtom(prevNavbarWidthAtom)
    const [, setIsHide] = useAtom(isHideAtom)
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
    const [project, setProject] = useAtom(projectAtom)
    const [openedNodes, setOpenedNodes] = useAtom(openedNodesAtom)
    const [, setHistoryTabs] = useAtom(historyTabsAtom)
    const [, setSelectedFiles] = useAtom(selectedFilesAtom)

    const loadProject = useCallback(async () => {
        const selected = await open({
            directory: true,
        })

        if (!selected) return

        if (!isLoading) setIsLoading(true)
        const project = await readDirectory(selected as string)
        setProject(project)
        setOpenedNodes(formatDirectory(project))
        setHistoryTabs([])
        setSelectedFiles([])
        setIsLoading(false)
    }, [])

    const collapseAllDirectories = useCallback(async () => {
        const formattedFiles = formatDirectory(await readDirectory(project.project_path))

        if (formattedFiles.length !== openedNodes.length) setOpenedNodes(formattedFiles)
    }, [openedNodes])

    const hideNavbar = useCallback(() => {
        setPrevNavbarWidth(navbarWidth)
        setNavbarWidth(50)
        setIsHide(true)
    }, [navbarWidth])

    const showNavbar = useCallback(() => {
        setNavbarWidth(prevNavbarWidth)
        setIsHide(false)
    }, [prevNavbarWidth])

    return { loadProject, collapseAllDirectories, hideNavbar, showNavbar }
}
