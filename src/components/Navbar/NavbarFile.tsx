import { IFile } from '@components/Navbar/Navbar'
import { FC } from 'react'
import { Box, Flex, ListItem } from '@chakra-ui/react'
import { FileIcon } from '@components/common/FileIcon'

interface NavbarFileProps {
    file: IFile
}

export const NavbarFile: FC<NavbarFileProps> = ({ file }) => {
    return (
        <ListItem cursor={'pointer'} _hover={{ background: '#A0AEC0' }} p={'5px'}>
            <Flex alignItems={'center'} gap={'5px'}>
                <FileIcon fileName={file.name} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {file.name}
                </Box>
            </Flex>
        </ListItem>
    )
}
