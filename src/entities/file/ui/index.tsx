import { CSSProperties, FC } from 'react'
import { IFile } from '@shared/types'
import { Box } from '@chakra-ui/react'
import { FileContainer, FileIcon } from '@shared/ui'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useFiles } from '@entities/file'

interface ViewProps {
    file: IFile
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ file, style = undefined }) => {
    const { depth, name, id } = file
    const [isResizing] = useAtom(isResizingAtom)
    const { selectFile, selectedFile } = useFiles()
    const isSelected = selectedFile.id === id

    const handleSelectFile = () => {
        selectFile(file)
    }

    return (
        <>
            <FileContainer
                isResizing={isResizing}
                isSelected={isSelected}
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
