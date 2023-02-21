import {
    Box,
    Button,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
} from '@chakra-ui/react'
import { FC } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    text: string
}

export const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, text }) => {
    const [theme] = useAtom(themeAtom)
    const {
        modals: { background, borders },
        body: { color },
    } = theme

    const handleOnConfirm = () => {
        onConfirm()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
            <ModalOverlay />
            <ModalContent minH={'150px'} bg={background} border={`1px solid ${borders.color}`} color={color}>
                <ModalCloseButton top={'5px'} right={'5px'} />
                <ModalBody fontSize={'16px'} pt={'40px'}>
                    <Flex h={'100%'} alignItems={'center'} justifyContent={'center'} gap={'15px'}>
                        <Icon fontSize={'32px'} aria-label={'Confirm delete'} as={AiOutlineInfoCircle} />
                        <Box>{text}</Box>
                    </Flex>
                </ModalBody>
                <ModalFooter display={'flex'} justifyContent={'flex-end'} alignItems={'center'} gap={'15px'}>
                    <Button size={'sm'} color={background} background={color} onClick={handleOnConfirm}>
                        Confirm
                    </Button>
                    <Button size={'sm'} color={background} background={color} onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
