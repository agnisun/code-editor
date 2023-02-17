import { useTools } from '@features/navbar-tools'
import { Icon, IconButton } from '@chakra-ui/react'
import { HiMinus } from 'react-icons/hi'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const HideButton = () => {
    const { hideNavbar } = useTools()
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

    const handleOnClick = () => {
        hideNavbar()
    }

    return (
        <IconButton
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={HiMinus} />}
            aria-label={'Hide navbar'}
            _hover={{ border: `1px solid ${borders.color}` }}
        />
    )
}
