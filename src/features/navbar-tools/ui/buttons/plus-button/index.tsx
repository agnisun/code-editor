import { useTools } from '@features/navbar-tools'
import { Icon, IconButton } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const PlusButton = () => {
    const { showNavbar } = useTools()
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

    const handleOnClick = () => {
        showNavbar()
    }

    return (
        <IconButton
            tabIndex={-1}
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={HiPlus} />}
            aria-label={'Show navbar'}
            _hover={{ border: `1px solid ${borders.color}` }}
        />
    )
}
