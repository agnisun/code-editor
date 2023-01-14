import { useCallback, useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { isNavbarHideAtom, navbarWidthAtom } from '@state/navbar'

export const useResizeNavbar = () => {
    const navbarRef = useRef<HTMLDivElement>(null)
    const [navbarWidth, setNavbarWidth] = useAtom(navbarWidthAtom)
    const [, setIsNavbarHide] = useAtom(isNavbarHideAtom)
    const [isResizing, setIsResizing] = useState<boolean>(false)

    const startResizing = useCallback(() => {
        document.body.style.cursor = 'ew-resize'
        setIsResizing(true)
    }, [])

    const stopResizing = useCallback(() => {
        document.body.style.cursor = 'auto'
        setIsResizing(false)
    }, [])

    const resize = useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing && navbarRef.current) {
                if (mouseMoveEvent.clientX < 80) {
                    setIsNavbarHide(true)
                    setNavbarWidth(50)
                } else if (mouseMoveEvent.clientX > 180) {
                    setIsNavbarHide(false)
                    setNavbarWidth(mouseMoveEvent.clientX - navbarRef.current.getBoundingClientRect().left)
                }
            }
        },
        [isResizing]
    )

    useEffect(() => {
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResizing)
        return () => {
            window.removeEventListener('mousemove', resize)
            window.removeEventListener('mouseup', stopResizing)
        }
    }, [resize, stopResizing])

    return { navbarWidth, startResizing, isResizing, navbarRef }
}
