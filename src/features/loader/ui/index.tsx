import { useAtom } from 'jotai'
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Progress } from '@chakra-ui/react'
import { isLoadingAtom } from '@entities/source'

export const View = () => {
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom)

    const handleOnClose = () => void setIsLoading(false)

    return (
        <Modal isCentered isOpen={isLoading} onClose={handleOnClose}>
            <ModalOverlay />
            <ModalContent bg={'#111'} w={'100%'} h={'200px'}>
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
