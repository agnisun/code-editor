import { useTools } from '@features/navbar-tools'
import { Icon, IconButton } from '@chakra-ui/react'
import { HiMinus } from 'react-icons/hi'

export const HideButton = () => {
    const { hideNavbar } = useTools()

    const handleOnClick = () => {
        hideNavbar()
    }

    return (
        <IconButton
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={HiMinus} />}
            aria-label={'Hide navbar'}
        />
    )
}
