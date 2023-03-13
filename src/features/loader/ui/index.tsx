import { useAtom } from 'jotai'
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Progress } from '@chakra-ui/react'
import { isLoadingAtom } from '@entities/source'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)
    const {
        body: { background, color },
        borders,
    } = theme

    const handleOnClose = () => void setIsLoading(false)

    return (
        <Modal isCentered isOpen={isLoading} onClose={handleOnClose}>
            <ModalOverlay />
            <ModalContent bg={background} w={'100%'} h={'200px'} border={`1px solid ${borders.color}`} color={color}>
                <ModalBody>
                    <Flex h={'100%'} flexDirection={'column'} justifyContent={'center'}>
                        <Box mb={'15px'} display={'flex'} justifyContent={'center'}>
                            Initializing project
                        </Box>
                        <Progress size="xs" isIndeterminate />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
