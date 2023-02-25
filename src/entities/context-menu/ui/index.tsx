import { Box, Portal, useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import {
    contextEntityAtom,
    contextMenuAtom,
    useContextMenu,
    useContextRename,
    useDeleteFile,
} from '@entities/context-menu/model'
import { themeAtom } from '@entities/theme'
import { FC, useRef } from 'react'
import { ConfirmModal } from '@entities/context-menu/ui/modals/confirm-modal'
import { getFilenameByPath } from '@shared/lib/get-filename'

interface ContextItemProps {
    children: JSX.Element
    onClick?: () => void
}

const ContextItem: FC<ContextItemProps> = ({ children, onClick }) => {
    const [theme] = useAtom(themeAtom)
    const {
        modals: { hover },
    } = theme

    return (
        <Box px={'30px'} py={'5px'} cursor={'pointer'} _hover={hover} onClick={onClick}>
            {children}
        </Box>
    )
}

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const elementRef = useRef<HTMLDivElement>(null)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextMenu] = useAtom(contextMenuAtom)
    const { onOpen: onOpenModal, isOpen: isOpenModal, onClose: onCloseModal } = useDisclosure()
    const { onClose } = useContextMenu()
    const { openRenameInput } = useContextRename()
    const { onDeleteFile, onDeleteDir } = useDeleteFile(onClose)
    const {
        modals: { borders, background },
        body,
    } = theme
    const { pageX, pageY, isActive } = contextMenu
    const { kind, path } = contextEntity
    const isFolder = kind === 'directory'
    const name = isFolder ? 'Folder' : 'File'
    useOutsideClick({ ref: elementRef, handler: isOpenModal ? undefined : onClose })

    const handleOnDelete = () => {
        if (isFolder) onDeleteDir(contextEntity)
        else onDeleteFile({ path })
        onClose()
    }

    const handleOnClose = () => {
        onCloseModal()
    }

    const handleOpenRenameInput = () => {
        openRenameInput({ path })
        onClose()
    }

    return (
        <>
            <Portal>
                {isActive && (
                    <Box
                        fontSize={'16px'}
                        ref={elementRef}
                        color={body.color}
                        position={'absolute'}
                        p={'5px'}
                        top={pageY}
                        left={pageX}
                        w={'300px'}
                        h={'auto'}
                        borderRadius={'0.375rem'}
                        border={`1px solid ${borders.color}`}
                        bg={background}
                    >
                        <Box>
                            {isFolder && (
                                <Box borderBottom={`1px solid ${borders.color}`} pb={'5px'} mb={'5px'}>
                                    <ContextItem>
                                        <Box>New File...</Box>
                                    </ContextItem>
                                    <ContextItem>
                                        <Box>New Folder...</Box>
                                    </ContextItem>
                                </Box>
                            )}
                            <Box>
                                <ContextItem onClick={handleOpenRenameInput}>
                                    <Box>Rename {name}</Box>
                                </ContextItem>
                                <ContextItem onClick={onOpenModal}>
                                    <Box>Delete {name}</Box>
                                </ContextItem>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Portal>
            <ConfirmModal
                onConfirm={handleOnDelete}
                onClose={handleOnClose}
                isOpen={isOpenModal}
                text={`Are you sure you want to delete '${getFilenameByPath(path)}'${
                    isFolder ? ' and its contents' : ''
                }?`}
            />
        </>
    )
}
