import { Box, Flex, Icon, IconButton } from '@chakra-ui/react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { MdExpand } from 'react-icons/md'
import { BsArrowsCollapse } from 'react-icons/bs'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { useAtom } from 'jotai'
import { isNavbarHideAtom, navbarWidthAtom } from '@state/navbar'
import { useCallback, useMemo } from 'react'

export const NavbarTools = () => {
    const [, setNavbarWidth] = useAtom(navbarWidthAtom)
    const [isNavbarHide, setIsNavbarHide] = useAtom(isNavbarHideAtom)
    const loadFile = useCallback(async () => {}, [])
    const expandDirectories = useCallback(() => {}, [])
    const collapseDirectories = useCallback(() => {}, [])
    const showNavbar = useCallback(() => {
        setNavbarWidth(190)
        setIsNavbarHide(false)
    }, [])
    const hideNavbar = useCallback(() => {
        setNavbarWidth(50)
        setIsNavbarHide(true)
    }, [])

    const navbarTools = useMemo(
        () => [
            {
                ariaLabel: isNavbarHide ? 'Show navbar' : 'Open folder',
                onClick: isNavbarHide ? showNavbar : loadFile,
                icon: isNavbarHide ? HiPlus : AiOutlineFolderOpen,
            },
            {
                ariaLabel: 'Expand directories',
                onClick: expandDirectories,
                icon: MdExpand,
            },
            {
                ariaLabel: 'Collapse directories',
                onClick: collapseDirectories,
                icon: BsArrowsCollapse,
            },
        ],
        [isNavbarHide]
    )

    return (
        <Box overflowX={'hidden'} p={'3px 5px'} borderBottom={'1px solid #fff'}>
            <Flex justifyContent={'space-between'}>
                <Flex gap={'5px'}>
                    {navbarTools.map(({ ariaLabel, onClick, icon }, i) => (
                        <IconButton
                            key={i}
                            variant={'toolsbar'}
                            onClick={onClick}
                            icon={<Icon as={icon} />}
                            aria-label={ariaLabel}
                        />
                    ))}
                </Flex>
                <IconButton
                    onClick={hideNavbar}
                    aria-label={'Hide navbar'}
                    variant={'toolsbar'}
                    icon={<Icon as={HiMinus} />}
                />
            </Flex>
        </Box>
    )
}