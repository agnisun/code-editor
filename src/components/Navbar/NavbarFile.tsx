import { IFile } from '@components/Navbar/Navbar'
import { CSSProperties, FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { FileIcon } from '@components/common/FileIcon'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@state/navbar'

interface NavbarFileProps {
    file: IFile
    style: CSSProperties
}

export const NavbarFile: FC<NavbarFileProps> = ({ file, style }) => {
    const [isResizing] = useAtom(isResizingAtom)

    return (
        <Box userSelect={isResizing ? 'none' : 'auto'} cursor={'pointer'} _hover={{ color: '#9ca3af' }} style={style}>
            <Flex alignItems={'center'} gap={'5px'} p={'5px'}>
                <FileIcon fileName={file.name} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {file.name}
                </Box>
            </Flex>
        </Box>
    )
}
