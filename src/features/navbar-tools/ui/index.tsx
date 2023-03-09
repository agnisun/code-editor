import { Box, Flex } from '@chakra-ui/react'
import { CollapseButton, FolderButton, HideButton, PlusButton } from './buttons'
import { useAtom } from 'jotai'
import { isHideAtom } from '@entities/navbar'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [isHide] = useAtom(isHideAtom)
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

    return (
        <Box overflowX={'hidden'} p={'3px 5px'} borderRight={`1px solid ${borders.color}`}>
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
