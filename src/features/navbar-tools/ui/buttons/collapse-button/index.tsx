import { useTools } from '@features/navbar-tools'
import { Icon, IconButton } from '@chakra-ui/react'
import { BsArrowsCollapse } from 'react-icons/bs'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const CollapseButton = () => {
    const { collapseAllDirectories } = useTools()
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

    const handleOnClick = () => {
        collapseAllDirectories()
    }

    return (
        <IconButton
            tabIndex={-1}
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={BsArrowsCollapse} />}
            aria-label={'Collapse folders'}
            _hover={{ border: `1px solid ${borders.color}` }}
        />
    )
}
