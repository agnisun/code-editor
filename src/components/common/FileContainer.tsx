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

    return (
        <Flex
            alignItems={'center'}
            gap={'5px'}
            cursor={'pointer'}
            _hover={selectedFile.id !== file.id && !isResizing ? { background: 'rgba(156, 163, 175, .5)' } : undefined}
            background={selectedFile.id === file.id ? 'rgba(156, 163, 175)' : 'transparent'}
            p={'5px'}
            style={style}
            {...props}
        >
            {children}
        </Flex>
    )
}
