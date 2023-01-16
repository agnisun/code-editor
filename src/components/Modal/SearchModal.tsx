import { FC } from 'react'
import {
    Box,
    Flex,
    Input,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

interface SearchModalProps {
    isOpen: boolean
    onClose: () => void
}

export const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
            <ModalOverlay />
            <ModalContent
                mt={0}
                mx={'50px'}
                bg={'#111'}
                border={'1px solid #fff'}
                borderBottom={'none'}
                h={'full'}
                overflow={'hidden'}
                borderBottomRadius={'none'}
            >
                <ModalHeader p={'0'} borderBottom={'1px solid #fff'}>
                    <Flex alignItems={'center'} justifyContent={'space-between'} h={'30px'}>
                        <Box px={'15px'} fontSize={'16px'}>
                            Tabs
                        </Box>
                    </Flex>
                    <Box h={'30px'}>
                        <Input h={'full'} />
                    </Box>
                </ModalHeader>
                <ModalBody p={'0'}>
                    <List>
                        <ListItem>File</ListItem>
                    </List>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
