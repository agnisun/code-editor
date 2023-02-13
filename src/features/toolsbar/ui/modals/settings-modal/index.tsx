import { Box, PopoverBody, PopoverContent, Portal, useDisclosure } from '@chakra-ui/react'
import { ThemeModal } from '@features/toolsbar/ui/modals/theme-modal'

export const SettingsModal = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <>
            <Portal>
                <PopoverContent bg={'#222'} borderColor={'#fff'} w={'200px'} color={'#fff'} minH={'auto'}>
                    <PopoverBody display={'flex'} flexDir={'column'}>
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
