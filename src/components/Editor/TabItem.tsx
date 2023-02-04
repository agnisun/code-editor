import { FC, MouseEvent, useCallback } from 'react'
import { File } from '@utils/filesys'
import { Box, Flex, Icon } from '@chakra-ui/react'
import { useSource } from '@hooks/useSource'
import { FileIcon } from '@components/common/FileIcon'
import { IoMdClose } from 'react-icons/io'

interface TabItemProps {
    file: File
}

export const TabItem: FC<TabItemProps> = ({ file }) => {
    const { name, id } = file
    const { selectFile, closeFile, selectedFile } = useSource()
    const isSelected = selectedFile.id === id

    const handleSelectFile = () => {
        selectFile(file, true)
    }

    const handleCloseFile = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        closeFile(file)
    }, [])

    return (
        <Flex
            flexShrink={0}
            alignItems={'center'}
            onClick={handleSelectFile}
            minW={'120px'}
            maxW={'240px'}
            p={'10px 30px 5px 8px'}
            h={'100%'}
            position={'relative'}
            gap={'5px'}
            fontSize={'20px'}
            background={isSelected ? '#111' : 'transparent'}
            color={isSelected ? '#fff' : 'rgba(255,255,255, 0.7)'}
        >
            <FileIcon fileName={name} />
            <Box userSelect={'none'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                {name}
            </Box>
            <Flex
                onClick={handleCloseFile}
                alignItems={'center'}
                position={'absolute'}
                top={'50%'}
                right={'5px'}
                sx={{ translate: '0 -50%' }}
                borderRadius={'50%'}
                _hover={{ background: '#fff', color: '#222' }}
            >
                <Icon as={IoMdClose} aria-label={'Close tab'} />
            </Flex>
        </Flex>
    )
}
