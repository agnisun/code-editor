import { ChangeEvent, CSSProperties, FC, KeyboardEvent, MouseEvent as ReactMouseEvent, useRef, useState } from 'react'
import { IFile } from '@shared/types'
import { Box, Input, useOutsideClick } from '@chakra-ui/react'
import { FileContainer, FileIcon } from '@shared/ui'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useFiles } from '@entities/file'
import { contextEntityAtom, contextRenameAtom, useContextMenu } from '@entities/context-menu/model/context-menu'
import { renamePath } from '@entities/context-menu/lib/rename-path'

interface ViewProps {
    file: IFile
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ file, style = undefined }) => {
    const { depth, name, id, kind, path } = file
    const [isError, setIsError] = useState<boolean>(false)
    const [inputValue, setInput] = useState<string>(name)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isResizing] = useAtom(isResizingAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextRename] = useAtom(contextRenameAtom)
    const { onOpen, closeRenameInput, onRename, isRenameExists } = useContextMenu()
    const { selectFile, selectedFile } = useFiles()
    const { isActive, id: renameId } = contextRename
    const isSelected = selectedFile.id === id
    const isContextOpen = isActive && renameId === id

    const handleSelectFile = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        selectFile({ ...file, path: file.path + '/' })
    }

    const handleOnContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const { pageX, pageY } = e
        onOpen({ kind, path, depth, id }, { isActive: true, pageX, pageY })
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

    useOutsideClick({ ref: inputRef, handler: isContextOpen ? handleOnCloseRename : undefined })

    return (
        <>
            <FileContainer
                isResizing={isResizing}
                isSelected={isSelected}
                isActive={contextEntity.id === id}
                onContextMenu={isContextOpen ? (e) => e.preventDefault() : handleOnContextMenu}
                onClick={handleSelectFile}
                style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}
            >
                <FileIcon fileName={inputValue} />
                {isContextOpen ? (
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
