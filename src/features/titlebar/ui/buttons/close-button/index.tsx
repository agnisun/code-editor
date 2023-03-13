import { Icon, IconButton } from '@chakra-ui/react'
import { appWindow } from '@tauri-apps/api/window'
import { IoMdClose } from 'react-icons/io'

export const CloseButton = () => {
    const handleOnClick = () => void appWindow.close()

    return (
        <IconButton
            tabIndex={-1}
            onClick={handleOnClick}
            variant={'titlebar'}
            aria-label={'Close window'}
            icon={<Icon as={IoMdClose} />}
        />
    )
}
