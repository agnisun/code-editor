import { CSSProperties, FC, MouseEvent } from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { Directory } from '@utils/filesys'
import { FileContainer } from '@components/common/FileContainer'
import { useSource } from '@hooks/useSource'

interface NavbarDirectoryProps {
    directory: Directory
    index: number
    style?: CSSProperties
}

export const NavbarDirectory: FC<NavbarDirectoryProps> = ({ directory, index, style = undefined }) => {
    const { handleExpand } = useSource()

    const { depth, name } = directory
    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        handleExpand(directory, index)
    }

    return (
        <>
            <FileContainer onClick={handleOnClick} style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}>
                <Icon as={FcFolder} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {name}
                </Box>
            </FileContainer>
        </>
    )
}
