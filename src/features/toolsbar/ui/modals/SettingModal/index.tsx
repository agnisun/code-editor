import {
    Box,
    Flex,
    Icon,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'
import { FC } from 'react'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

export const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'5xl'} isCentered>
            <ModalOverlay />
            <ModalContent mx={'50px'} bg={'#111'} border={'1px solid #fff'} h={'50vh'}>
                <ModalHeader p={'0'} borderBottom={'1px solid #fff'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'}>
                        <Box px={'15px'} fontSize={'16px'}>
                            Settings
                        </Box>
                        <IconButton
                            w={'60px'}
                            variant={'titlebar'}
                            aria-label={'Close modal'}
                            icon={<Icon as={IoMdClose} />}
                        />
                    </Flex>
                </ModalHeader>
                <ModalBody p={'0'}>
                    <Flex h={'100%'}>
                        <Box minW={'190px'} h={'100%'} borderRight={'1px solid #fff'}>
                            SettingsItem
                        </Box>
                        <Box flex={'1'} h={'100%'}>
                            SettingsArea
                        </Box>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
