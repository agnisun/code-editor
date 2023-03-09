import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { MouseEvent, useCallback } from 'react'
import { isHideAtom, isResizingAtom } from '@entities/navbar'
import { useResizeNavbar } from '../model'
import { NavbarTools } from '@features/navbar-tools'
import { NavbarFiles } from '@features/navbar-files'
import { ViewDrawer } from '@features/view-drawer'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const { startResizing, navbarWidth, navbarRef } = useResizeNavbar()
    const [isHide] = useAtom(isHideAtom)
    const [isResizing] = useAtom(isResizingAtom)
    const [theme] = useAtom(themeAtom)
    const {
        body: { color },
        navbar: { background },
    } = theme

    const handleOnMouseDown = useCallback(
        (e: MouseEvent) => {
            if (isResizing) {
                e.preventDefault()
                return
            }

            return true
        },
        [isResizing]
    )

    return (
        <Box
            userSelect={'none'}
            minW={isHide ? '52px' : '190px'}
            w={navbarWidth + 'px'}
            bg={background}
            pos={'relative'}
            ref={navbarRef}
            color={color}
            onMouseDown={handleOnMouseDown}
        >
            <NavbarTools />
            <NavbarFiles />
            <ViewDrawer startResizing={startResizing} />
        </Box>
    )
}
