import { CSSProperties, FC } from 'react'
import { Box } from '@chakra-ui/react'
import { FileIcon } from '@components/common/FileIcon'
import { File } from '@utils/filesys'
import { FileContainer } from '@components/common/FileContainer'
import { useSource } from '@hooks/useSource'

interface NavbarFileProps {
    file: File
    style?: CSSProperties
}

export const NavbarFile: FC<NavbarFileProps> = ({ file, style = undefined }) => {
    const { depth, name } = file
    const { selectFile } = useSource()

    const handleSelectFile = () => {
        selectFile(file)
    }

    return (
        <>
            <FileContainer
                file={file}
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
