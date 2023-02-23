import { ChangeEvent, CSSProperties, FC, KeyboardEvent, MouseEvent, useRef, useState } from 'react'
import { Box, Icon, Input, useOutsideClick } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { IDirectory } from '@shared/types'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useDirectories } from '../model'
import { FileContainer } from '@shared/ui'
import { contextEntityAtom, contextRenameAtom, useContextMenu, useContextRename } from '@entities/context-menu/model'
import { renamePath } from '@entities/context-menu/lib/rename-path'

interface ViewProps {
    directory: IDirectory
    index: number
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ directory, index, style = undefined }) => {
    const { depth, name, kind, path, id } = directory
    const [isError, setIsError] = useState<boolean>(false)
    const [inputValue, setInput] = useState<string>(name)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isResizing] = useAtom(isResizingAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextRename] = useAtom(contextRenameAtom)
    const { onOpen } = useContextMenu()
    const { isRenameExists, closeRenameInput, onRename } = useContextRename()
    const { handleExpand } = useDirectories()
    const { isActive: isRenameActive, id: renameId } = contextRename
    const isRenameOpen = isRenameActive && renameId === id

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        handleExpand(directory, index)
    }

    const handleOnContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const { pageX, pageY } = e
        onOpen({ kind, path, depth, id, index }, { isActive: true, pageX, pageY })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setIsError(isRenameExists(value, depth))
        setInput(value)
    }

    const handleOnCloseRename = async () => {
        if (inputValue !== name) {
            try {
                await onRename({ path, newPath: renamePath(path, inputValue), id, depth })
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

    useOutsideClick({ ref: inputRef, handler: isRenameOpen ? handleOnCloseRename : undefined })

    return (
        <>
            <FileContainer
                onClick={handleOnClick}
                onContextMenu={isRenameOpen ? (e) => e.preventDefault() : handleOnContextMenu}
                isResizing={isResizing}
                isActive={contextEntity.id === id}
                style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}
            >
                <Icon as={FcFolder} />
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
                        h={'32px'}
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
