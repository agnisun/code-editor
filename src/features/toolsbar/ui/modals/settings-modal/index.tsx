import { Box, PopoverBody, PopoverContent, Portal, useDisclosure } from '@chakra-ui/react'
import { ThemeModal } from '@features/toolsbar/ui/modals/theme-modal'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const SettingsModal = () => {
    const [theme] = useAtom(themeAtom)
    const {
        body: { color },
        modals: { background, borders },
    } = theme
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <Portal>
                <PopoverContent
                    fontSize={'16px'}
                    color={color}
                    bg={background}
                    borderColor={borders.color}
                    w={'200px'}
                    minH={'auto'}
                >
                    <PopoverBody display={'flex'} flexDir={'column'} p={'5px 0'}>
                        <Box px={'30px'} cursor={'pointer'} onClick={onOpen}>
                            Theme...
                        </Box>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
            <ThemeModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
