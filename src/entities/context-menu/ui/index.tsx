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
import { FC, useRef, useState } from 'react'
import { ConfirmModal } from '@entities/context-menu/ui/modals/confirm-modal'
import { getFilenameByPath } from '@shared/lib/get-filename'
import { useDirectories } from '@entities/directory/model'
import { IDirectory } from '@shared/types'
import { CreateModal } from '@entities/context-menu/ui/modals/create-modal'

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
    const [createKind, setCreateKind] = useState<'file' | 'directory'>('file')
    const confirmModal = useDisclosure()
    const createModal = useDisclosure()
    const { onClose } = useContextMenu()
    const { handleExpand } = useDirectories()
    const { openRenameInput } = useContextRename()
    const { onDeleteFile, onDeleteDir } = useDeleteFile(onClose)
    const {
        modals: { borders, background },
        body,
    } = theme
    const { pageX, pageY, isActive } = contextMenu
    const { kind, path, expanded } = contextEntity
    const isFolder = kind === 'directory'
    const name = isFolder ? 'Folder' : 'File'
    useOutsideClick({ ref: elementRef, handler: confirmModal.isOpen || createModal.isOpen ? undefined : onClose })

    const handleOnDelete = () => {
        if (isFolder) onDeleteDir(contextEntity)
        else onDeleteFile({ path })
        onClose()
    }

    const handleOnCloseConfirm = () => {
        confirmModal.onClose()
    }

    const handleOnRename = () => {
        openRenameInput({ path })
        onClose()
    }

    const onCreate = (kind: 'file' | 'directory') => {
        if (!expanded) {
            const { index, ...directory } = contextEntity
            handleExpand(directory as IDirectory, index as number)
        }
        createModal.onOpen()
        setCreateKind(kind)
    }

    const handleOnCreateFile = () => {
        onCreate('file')
    }

    const handleOnCreateDir = () => {
        onCreate('directory')
    }

    const handleOnCloseCreate = () => {
        createModal.onClose()
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
                                    <ContextItem onClick={handleOnCreateFile}>
                                        <Box>New File...</Box>
                                    </ContextItem>
                                    <ContextItem onClick={handleOnCreateDir}>
                                        <Box>New Folder...</Box>
                                    </ContextItem>
                                </Box>
                            )}
                            <Box>
                                <ContextItem onClick={handleOnRename}>
                                    <Box>Rename {name}</Box>
                                </ContextItem>
                                <ContextItem onClick={confirmModal.onOpen}>
                                    <Box>Delete {name}</Box>
                                </ContextItem>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Portal>
            <CreateModal
                kind={createKind}
                isOpen={createModal.isOpen}
                onConfirm={handleOnCloseCreate}
                onClose={createModal.onClose}
            />
            <ConfirmModal
                onConfirm={handleOnDelete}
                onClose={handleOnCloseConfirm}
                isOpen={confirmModal.isOpen}
                text={`Are you sure you want to delete '${getFilenameByPath(path)}'${
                    isFolder ? ' and its contents' : ''
                }?`}
            />
        </>
    )
}
