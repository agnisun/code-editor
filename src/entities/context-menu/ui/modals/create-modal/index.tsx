import {
    Box,
    Flex,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'
import { FileIcon } from '@shared/ui'
import { FcFolder } from 'react-icons/fc'
import { contextEntityAtom, useContextCreate } from '@entities/context-menu'
import { IFileNode } from '@shared/types'

interface CreateModalProps {
    isOpen: boolean
    onClose: () => void
    kind: 'file' | 'directory'
    onConfirm: () => void
}

export const CreateModal: FC<CreateModalProps> = ({ isOpen, onConfirm, onClose, kind }) => {
    const [input, setInput] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(false)
    const { isCreateExists, onCreate } = useContextCreate()
    const [contextEntity] = useAtom(contextEntityAtom)
    const { depth, path, index } = contextEntity
    const [theme] = useAtom(themeAtom)
    const {
        modals: { background, borders },
        body: { color },
    } = theme

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setIsError(isCreateExists(path, value, depth + 1))
        setInput(value)
    }

    const handleOnCreate = async () => {
        const newNode: IFileNode = {
            name: input,
            depth: depth + 1,
            kind,
            path: path + '/' + input,
            parent: path,
        }

        try {
            await onCreate(newNode, index as number)
            onConfirm()
        } catch (e) {
            console.error(e)
        } finally {
            setInput('')
        }
    }

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleOnCreate()
        }
    }

    const handleOnClose = () => {
        onClose()
        setInput('')
        setIsError(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={handleOnClose} isCentered size={'sm'}>
            <ModalOverlay />
            <ModalContent minH={'120px'} bg={background} border={`1px solid ${borders.color}`} color={color}>
                <ModalHeader
                    p={'13px 20px'}
                    display={'flex'}
                    justifyContent={'center'}
                    fontSize={'18px'}
                    fontWeight={'400'}
                    borderBottom={`1px solid ${borders.color}`}
                >
                    <Box>New {kind}</Box>
                    <ModalCloseButton top={'5px'} right={'5px'} />
                </ModalHeader>
                <ModalBody p={0} h={'100%'} display={'flex'} alignItems={'center'}>
                    <Flex w={'100%'} p={'10px'} gap={'5px'} alignItems={'center'}>
                        {kind === 'file' ? <FileIcon fileName={input} /> : <Icon as={FcFolder} />}
                        <Input
                            focusBorderColor={isError ? 'red.600' : undefined}
                            borderColor={borders.color}
                            onKeyDown={handleOnKeyDown}
                            autoFocus
                            value={input}
                            onChange={handleOnChange}
                        />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
