import { Box } from '@chakra-ui/react'
import { ViewDrawer } from '@components/ViewDrawer/ViewDrawer'
import { MouseEvent as MouseEventReact } from 'react'
import { useResizeNavbar } from '@hooks/useResizeNavbar'
import { NavbarTools } from '@components/Navbar/NavbarTools'
import { useAtom } from 'jotai'
import { isNavbarHideAtom, isResizingAtom } from '@state/navbar'
import { NavbarFiles } from '@components/Navbar/NavbarFiles'

export const Navbar = () => {
    const { startResizing, navbarWidth, navbarRef } = useResizeNavbar()
    const [isNavbarHide] = useAtom(isNavbarHideAtom)
    const [isResizing] = useAtom(isResizingAtom)

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
            <NavbarFiles />
            <ViewDrawer startResizing={startResizing} />
        </Box>
    )
}
