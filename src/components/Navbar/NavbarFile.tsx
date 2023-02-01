import { CSSProperties, FC } from 'react'
import { Box } from '@chakra-ui/react'
import { FileIcon } from '@components/common/FileIcon'
import { File } from '@utils/filesys'
import { FileContainer } from '@components/common/FileContainer'

interface NavbarFileProps {
    file: File
    style?: CSSProperties
}

export const NavbarFile: FC<NavbarFileProps> = ({ file, style = undefined }) => {
    const { depth, name } = file

    return (
        <>
            <FileContainer style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}>
                <FileIcon fileName={file.name} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {name}
                </Box>
            </FileContainer>
        </>
    )
}
