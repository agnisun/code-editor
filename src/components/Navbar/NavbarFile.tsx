import { IFile } from '@components/Navbar/Navbar'
import { FC } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { FileIcon } from '@components/common/FileIcon'

interface NavbarFileProps {
    file: IFile
}

export const NavbarFile: FC<NavbarFileProps> = ({ file }) => {
    return (
        <Box cursor={'pointer'} _hover={{ color: '#9ca3af' }}>
            <Flex alignItems={'center'} gap={'5px'} p={'5px'}>
                <FileIcon fileName={file.name} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {file.name}
                </Box>
            </Flex>
        </Box>
    )
}
