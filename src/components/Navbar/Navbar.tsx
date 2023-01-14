import { Box } from '@chakra-ui/react'
import { ViewDrawer } from '@components/ViewDrawer/ViewDrawer'
import { MouseEvent as MouseEventReact, useState } from 'react'
import { useResizeNavbar } from '@hooks/useResizeNavbar'
import { NavbarTools } from '@components/Navbar/NavbarTools'
import { useAtom } from 'jotai'
import { isNavbarHideAtom } from '@state/navbar'

export interface IFile {}

export const Navbar = () => {
    const [projectName, setProjectName] = useState<string>('')
    const [files, setFiles] = useState<IFile[]>([])
    const { isResizing, startResizing, navbarWidth, navbarRef } = useResizeNavbar()
    const [isNavbarHide] = useAtom(isNavbarHideAtom)

    const handleOnMouseDown = (e: MouseEventReact) => {
        if (isResizing) {
            e.preventDefault()
            return
        }

        return true
    }

    return (
        <Box
            userSelect={'none'}
            minW={isNavbarHide ? '50px' : '190px'}
            w={navbarWidth + 'px'}
            bg={'#222'}
            pos={'relative'}
            ref={navbarRef}
            onMouseDown={handleOnMouseDown}
        >
            <NavbarTools />
            <Box>Files</Box>
            <ViewDrawer startResizing={startResizing} />
        </Box>
    )
}
