import { ChangeEvent, CSSProperties, FC, KeyboardEvent, MouseEvent as ReactMouseEvent, useRef, useState } from 'react'
import { IFile } from '@shared/types'
import { Box, Input, useOutsideClick } from '@chakra-ui/react'
import { FileContainer, FileIcon } from '@shared/ui'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useFiles } from '@entities/file'
import { contextEntityAtom, contextRenameAtom, useContextMenu, useContextRename } from '@entities/context-menu/model'
import { renamePathByNewName } from '@entities/context-menu/lib/rename-path'

interface ViewProps {
    file: IFile
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ file, style = undefined }) => {
    const { depth, name, path } = file
    const [isError, setIsError] = useState<boolean>(false)
    const [inputValue, setInput] = useState<string>(name)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isResizing] = useAtom(isResizingAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextRename] = useAtom(contextRenameAtom)
    const { onOpen } = useContextMenu()
    const { selectFile, selectedFile } = useFiles()
    const { isRenameExists, closeRenameInput, onRename } = useContextRename()
    const { isActive: isRenameActive, path: renamePath } = contextRename
    const isSelected = selectedFile.path === path
    const isRenameOpen = isRenameActive && renamePath === path

    const handleSelectFile = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        selectFile({ ...file })
    }

    const handleOnContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const { pageX, pageY } = e
        onOpen({ ...file }, { isActive: true, pageX, pageY })
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setIsError(isRenameExists(contextEntity.path, value, depth))
        setInput(value)
    }

    const handleOnCloseRename = async () => {
        if (inputValue !== name) {
            try {
                await onRename(
                    { ...file, newPath: renamePathByNewName(path, inputValue), newName: inputValue },
                    contextEntity.path
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

    useOutsideClick({ ref: inputRef, handler: isRenameOpen ? handleOnCloseRename : undefined })

    return (
        <>
            <FileContainer
                isResizing={isResizing}
                isSelected={isSelected}
                isActive={contextEntity.path === path}
                onContextMenu={isRenameOpen ? (e) => e.preventDefault() : handleOnContextMenu}
                onClick={handleSelectFile}
                style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}
            >
                <FileIcon fileName={inputValue} />
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
