import { Box, Flex } from '@chakra-ui/react'
import { CollapseButton, FolderButton, HideButton, PlusButton } from './buttons'
import { useAtom } from 'jotai'
import { isHideAtom } from '@entities/navbar'

export const View = () => {
    const [isHide] = useAtom(isHideAtom)

    return (
        <Box overflowX={'hidden'} p={'3px 5px'} borderBottom={'1px solid #fff'}>
            <Flex justifyContent={'space-between'}>
                <Flex gap={'5px'}>
                    {!isHide ? <FolderButton /> : <PlusButton />}
                    <CollapseButton />
                </Flex>
                <HideButton />
            </Flex>
        </Box>
    )
}
