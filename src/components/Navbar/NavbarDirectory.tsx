import { IFile } from '@components/Navbar/Navbar'
import { FC, MouseEvent, useState } from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { NavbarFiles } from '@components/Navbar/NavbarFiles'

interface NavbarDirectoryProps {
    directory: IFile
    files: IFile[]
}

export const NavbarDirectory: FC<NavbarDirectoryProps> = ({ directory, files }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const handleOnShow = async (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        setIsVisible(!isVisible)
    }
    
    return (
        <>
            <Flex
                alignItems={'center'}
                gap={'5px'}
                onClick={handleOnShow}
                cursor={'pointer'}
                _hover={{ color: '#9ca3af' }}
                p={'5px'}
            >
                <Icon as={FcFolder} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {directory.name}
                </Box>
            </Flex>
            <Box pl={'15px'}>{isVisible && <NavbarFiles files={files} />}</Box>
        </>
    )
}
