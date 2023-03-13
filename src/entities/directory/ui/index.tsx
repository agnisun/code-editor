import { ChangeEvent, CSSProperties, FC, KeyboardEvent, MouseEvent, useRef, useState } from 'react'
import { Box, Flex, Icon, Input, useOutsideClick } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { IDirectory } from '@shared/types'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useDirectories } from '../model'
import { FileContainer } from '@shared/ui'
import { contextEntityAtom, contextRenameAtom, useContextMenu, useContextRename } from '@entities/context-menu/model'
import { renamePathByNewName } from '@entities/context-menu/lib/rename-path'
import { HiChevronDown, HiChevronRight } from 'react-icons/hi'

interface ViewProps {
    directory: IDirectory
    index: number
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ directory, index, style = undefined }) => {
    const { depth, name, path, parent, expanded } = directory
    const [isError, setIsError] = useState<boolean>(false)
    const [inputValue, setInput] = useState<string>(name)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isResizing] = useAtom(isResizingAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextRename] = useAtom(contextRenameAtom)
    const { onOpen } = useContextMenu()
    const { isRenameExists, closeRenameInput, onRename } = useContextRename()
    const { handleExpand } = useDirectories()
    const { isActive: isRenameActive, path: renamePath } = contextRename
    const isRenameOpen = isRenameActive && renamePath === path

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        handleExpand(directory, index)
    }

    const handleOnContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const { pageX, pageY } = e
        onOpen({ ...directory, index }, { isActive: true, pageX, pageY })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setIsError(isRenameExists(parent, name, value, depth))
        setInput(value)
    }

    const handleOnCloseRename = async () => {
        if (inputValue !== name) {
            try {
                await onRename(
                    { ...directory, newPath: renamePathByNewName(path, inputValue), newName: inputValue },
                    index
                )
            } catch (e) {
                setInput(name)
                setIsError(false)
            }
        }

        closeRenameInput()
    }

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isError) {
            handleOnCloseRename()
        }
    }

    const handler = isRenameOpen ? handleOnCloseRename : undefined

    useOutsideClick({ ref: inputRef, handler })

    return (
        <>
            <FileContainer
                onClick={handleOnClick}
                onContextMenu={isRenameOpen ? (e) => e.preventDefault() : handleOnContextMenu}
                isResizing={isResizing}
                isActive={contextEntity.path === path}
                style={{ ...style, paddingLeft: `${depth ? depth * 25 : 5}px` }}
            >
                <Flex alignItems={'center'} gap={'5px'}>
                    <Icon as={expanded ? HiChevronDown : HiChevronRight} />
                    <Icon as={FcFolder} />
                </Flex>
                {isRenameOpen ? (
                    <Input
                        focusBorderColor={isError ? 'red.600' : undefined}
                        onKeyDown={handleOnKeyDown}
                        value={inputValue}
                        onChange={handleOnChange}
                        ref={inputRef}
                        fontSize={'18px'}
                        borderRadius={0}
                        p={0}
                        h={'33px'}
                        border={0}
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <Box h={'100%'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                        {inputValue}
                    </Box>
                )}
            </FileContainer>
        </>
    )
}
