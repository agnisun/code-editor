import { Icon, IconButton } from '@chakra-ui/react'
import { appWindow } from '@tauri-apps/api/window'
import { HiMinus } from 'react-icons/hi'

export const HideButton = () => {
    const handleOnClick = () => void appWindow.minimize()

    return (
        <IconButton
            onClick={handleOnClick}
            variant={'titlebar'}
            aria-label={'Hide window'}
            icon={<Icon as={HiMinus} />}
        />
    )
}
