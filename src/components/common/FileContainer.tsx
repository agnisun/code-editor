import { FC } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@state/navbar'
import { useSource } from '@hooks/useSource'
import { Directory, File } from '@utils/filesys'

interface FileContainerProps extends FlexProps {
    file: File | Directory
}

export const FileContainer: FC<FileContainerProps> = ({ children, style, file, ...props }) => {
    const [isResizing] = useAtom(isResizingAtom)
    const { selectedFile } = useSource()
    const isSelected = selectedFile.id === file.id

    return (
        <Flex
            alignItems={'center'}
            gap={'5px'}
            cursor={'pointer'}
            _hover={!isSelected && !isResizing ? { background: 'rgba(55, 55, 61, .5)' } : undefined}
            background={isSelected ? '#37373D' : 'transparent'}
            p={'5px'}
            style={style}
            {...props}
        >
            {children}
        </Flex>
    )
}
