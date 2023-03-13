import { Icon, IconButton } from '@chakra-ui/react'
import { appWindow } from '@tauri-apps/api/window'
import { useState } from 'react'
import { RiFileCopyLine } from 'react-icons/ri'
import { BiCheckbox } from 'react-icons/bi'

export const ScaleButton = () => {
    const [isScaleUp, setIsScaleUp] = useState<boolean>(false)
    const icon = isScaleUp ? RiFileCopyLine : BiCheckbox
    const ariaLabel = isScaleUp ? 'Shrink window' : 'Scale window'

    const handleOnClick = () => {
        appWindow.toggleMaximize()
        setIsScaleUp(!isScaleUp)
    }

    return (
        <IconButton
            tabIndex={-1}
            onClick={handleOnClick}
            variant={'titlebar'}
            aria-label={ariaLabel}
            icon={<Icon as={icon} />}
        />
    )
}
