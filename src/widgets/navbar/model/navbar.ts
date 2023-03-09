import { useCallback, useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { isHideAtom, isResizingAtom, navbarWidthAtom, prevNavbarWidthAtom } from '@entities/navbar'

export const useResizeNavbar = () => {
    const navbarRef = useRef<HTMLDivElement>(null)
    const [navbarWidth, setNavbarWidth] = useAtom(navbarWidthAtom)
    const [, setPrevNavbarWidth] = useAtom(prevNavbarWidthAtom)
    const [, setIsNavbarHide] = useAtom(isHideAtom)
    const [isResizing, setIsResizing] = useAtom(isResizingAtom)

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
                    setNavbarWidth(52)
                    setPrevNavbarWidth(52)
                } else if (mouseMoveEvent.clientX > 180 && mouseMoveEvent.clientX < window.innerWidth - 100) {
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
