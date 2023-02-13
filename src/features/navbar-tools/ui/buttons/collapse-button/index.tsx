import { useTools } from '@features/navbar-tools'
import { Icon, IconButton } from '@chakra-ui/react'
import { BsArrowsCollapse } from 'react-icons/bs'

export const CollapseButton = () => {
    const { collapseAllDirectories } = useTools()

    const handleOnClick = () => {
        collapseAllDirectories()
    }

    return (
        <IconButton
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={BsArrowsCollapse} />}
            aria-label={'Collapse folders'}
        />
    )
}
