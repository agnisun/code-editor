import { Box, Flex, Icon, IconButton } from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'
import { HiMinus } from 'react-icons/hi'
import { RiFileCopyLine } from 'react-icons/ri'
import { BiCheckbox } from 'react-icons/bi'
import { useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'

export const Titlebar = () => {
    const [isScaleUp, setIsScaleUp] = useState<boolean>(false)
    const appWindowIcons = [
        {
            icon: HiMinus,
            ariaLabel: 'Hide window',
            onClick: () => void appWindow.minimize(),
        },
        {
            icon: isScaleUp ? RiFileCopyLine : BiCheckbox,
            ariaLabel: isScaleUp ? 'Shrink window' : 'Scale window',
            onClick: isScaleUp
                ? () => {
                      appWindow.toggleMaximize()
                      setIsScaleUp(false)
                  }
                : () => {
                      appWindow.toggleMaximize()
                      setIsScaleUp(true)
                  },
        },
        {
            icon: IoMdClose,
            ariaLabel: 'Close window',
            onClick: () => void appWindow.close(),
        },
    ]

    return (
        <Flex
            pos={'fixed'}
            top={0}
            left={0}
            w={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            fontSize={'.9rem'}
            bg={'#111'}
        >
            <Box px={'15px'}>Code Editor</Box>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                {appWindowIcons.map(({ icon, ariaLabel, onClick }, i) => (
                    <IconButton
                        onClick={onClick}
                        key={i}
                        variant={'titlebar'}
                        aria-label={ariaLabel}
                        icon={<Icon as={icon} />}
                    />
                ))}
            </Flex>
        </Flex>
    )
}
