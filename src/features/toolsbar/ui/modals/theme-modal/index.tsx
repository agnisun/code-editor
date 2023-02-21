import { FC, useCallback } from 'react'
import { Box, Flex, List, ListItem, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ITheme, themeAtom, themes } from '@entities/theme/model/theme'
import { useAtom } from 'jotai'

interface ThemeModalProps {
    isOpen: boolean
    onClose: () => void
}

interface ThemeItemProps {
    themeItem: ITheme
    index: number
}

const ThemeItem: FC<ThemeItemProps> = ({ themeItem, index }) => {
    const [theme, setTheme] = useAtom(themeAtom)
    const isSelected = theme.name === themeItem.name
    const {
        modals: { hover, active },
    } = theme

    const handleOnClick = useCallback(() => {
        setTheme(themeItem)
    }, [])

    return (
        <ListItem
            onClick={handleOnClick}
            cursor={'default'}
            px={'10px'}
            py={'5px'}
            sx={isSelected ? active : undefined}
            _hover={!isSelected ? hover : undefined}
        >
            <Flex gap={'5px'} alignItems={'center'}>
                <Box fontSize={'.9rem'}>{index + 1}.</Box>
                <Box>{themeItem.name}</Box>
            </Flex>
        </ListItem>
    )
}

export const ThemeModal: FC<ThemeModalProps> = ({ isOpen, onClose }) => {
    const [theme] = useAtom(themeAtom)
    const {
        body: { color },
        modals: { background, borders },
    } = theme

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent fontSize={'16px'} color={color} bg={background} border={`1px solid ${borders.color}`}>
                <ModalHeader
                    display={'flex'}
                    fontSize={'18px'}
                    justifyContent={'center'}
                    borderBottom={`1px solid ${borders.color}`}
                >
                    Theme
                </ModalHeader>
                <ModalBody p={0}>
                    <List py={'5px'}>
                        {themes.map((theme, i) => (
                            <ThemeItem key={theme.id} themeItem={theme} index={i} />
                        ))}
                    </List>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
