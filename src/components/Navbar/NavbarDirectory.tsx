import { IFile } from '@components/Navbar/Navbar'
import { FC } from 'react'
import { Box, Flex, Icon, ListItem } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'

interface NavbarDirectoryProps {
    directory: IFile
}

export const NavbarDirectory: FC<NavbarDirectoryProps> = ({ directory }) => {
    return (
        <ListItem cursor={'pointer'} _hover={{ background: '#A0AEC0' }} p={'5px'}>
            <Flex alignItems={'center'} gap={'5px'}>
                <Icon as={FcFolder} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {directory.name}
                </Box>
            </Flex>
        </ListItem>
    )
}
