import { FC, MouseEvent, useCallback } from 'react'
import { IFile } from '@shared/types'
import { Box, Flex, Icon } from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'
import { useFiles } from '@entities/file'
import { FileIcon } from '@shared/ui'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

interface ViewProps {
    file: IFile
}

export const View: FC<ViewProps> = ({ file }) => {
    const [theme] = useAtom(themeAtom)
    const {
        tabs: { item, active },
    } = theme
    const { name, path } = file
    const { selectFile, closeFile, selectedFile } = useFiles()
    const isSelected = selectedFile.path === path

    const handleSelectFile = () => {
        selectFile({ ...file }, true)
    }

    const handleCloseFile = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        closeFile({ ...file })
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
            background={isSelected ? (active.background as string) : item.background}
            color={isSelected ? active.color : item.color}
        >
            <FileIcon fileName={name} />
            <Box userSelect={'none'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                {name}
            </Box>
            <Flex
                onClick={handleCloseFile}
                alignItems={'center'}
                position={'absolute'}
                top={'55%'}
                sx={{ transform: 'translateY(-50%)' }}
                right={'2px'}
                borderRadius={'50%'}
                p={'3px'}
                _hover={{ ...item.iconHover, color: isSelected ? active.color : item.iconHover?.color || 'auto' }}
            >
                <Icon fontSize={'18px'} as={IoMdClose} aria-label={'Close tab'} />
            </Flex>
        </Flex>
    )
}
