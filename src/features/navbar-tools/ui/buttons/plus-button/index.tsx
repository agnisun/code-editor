import { useTools } from '@features/navbar-tools'
import { Icon, IconButton } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'

export const PlusButton = () => {
    const { showNavbar } = useTools()

    const handleOnClick = () => {
        showNavbar()
    }

    return (
        <IconButton
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={HiPlus} />}
            aria-label={'Show navbar'}
        />
    )
}
