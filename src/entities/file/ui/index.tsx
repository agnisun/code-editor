import { CSSProperties, FC, MouseEvent } from 'react'
import { IFile } from '@shared/types'
import { Box } from '@chakra-ui/react'
import { FileContainer, FileIcon } from '@shared/ui'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useFiles } from '@entities/file'
import { contextEntityAtom, useContextMenu } from '@entities/context-menu/model/context-menu'

interface ViewProps {
    file: IFile
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ file, style = undefined }) => {
    const { depth, name, id, kind, path } = file
    const [isResizing] = useAtom(isResizingAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const { onOpen } = useContextMenu()
    const { selectFile, selectedFile } = useFiles()
    const isSelected = selectedFile.id === id

    const handleSelectFile = () => {
        selectFile({ ...file, path: file.path + '/' })
    }

    const handleOnContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        const { pageX, pageY } = e
        onOpen({ kind, path, depth, id }, { isActive: true, pageX, pageY })
    }

    return (
        <>
            <FileContainer
                isResizing={isResizing}
                isSelected={isSelected}
                isActive={contextEntity.id === id}
                onContextMenu={handleOnContextMenu}
                onClick={handleSelectFile}
                style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}
            >
                <FileIcon fileName={name} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {name}
                </Box>
            </FileContainer>
        </>
    )
}
