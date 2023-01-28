import { IFile } from '@components/Navbar/Navbar'
import { CSSProperties, FC, MouseEvent, useState } from 'react'
import { Box, Flex, Icon } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { NavbarFiles } from '@components/Navbar/NavbarFiles'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@state/navbar'

interface NavbarDirectoryProps {
    directory: IFile
    files: IFile[]
    style: CSSProperties
}

export const NavbarDirectory: FC<NavbarDirectoryProps> = ({ directory, files, style }) => {
    const [isResizing] = useAtom(isResizingAtom)
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
                _hover={!isResizing ? { color: '#9ca3af' } : undefined}
                p={'5px'}
                style={style}
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
