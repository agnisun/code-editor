import { FC } from 'react'
import { Box, Flex, List, ListItem, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

interface ThemeModalProps {
    isOpen: boolean
    onClose: () => void
}

interface ItemContainerProps {
    children: JSX.Element
}

const ItemContainer: FC<ItemContainerProps> = ({ children }) => (
    <ListItem cursor={'default'} px={'10px'} py={'5px'} _hover={{ background: '#ccc' }}>
        {children}
    </ListItem>
)

export const ThemeModal: FC<ThemeModalProps> = ({ isOpen, onClose }) => {
    const themes = ['Light', 'Dark']

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg={'#222'} border={'1px solid #fff'}>
                <ModalHeader
                    display={'flex'}
                    fontSize={'18px'}
                    justifyContent={'center'}
                    borderBottom={'1px solid #fff'}
                >
                    Theme
                </ModalHeader>
                <ModalBody p={0}>
                    <List py={'5px'}>
                        {themes.map((theme, i) => (
                            <ItemContainer key={i}>
                                <Flex gap={'5px'} alignItems={'center'}>
                                    <Box fontSize={'.9rem'}>{i + 1}.</Box>
                                    <Box>{theme}</Box>
                                </Flex>
                            </ItemContainer>
                        ))}
                    </List>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
