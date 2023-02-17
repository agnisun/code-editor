import { Box, Flex } from '@chakra-ui/react'
import { CloseButton, HideButton, ScaleButton } from './buttons'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const {
        titlebar: { background },
    } = theme

    return (
        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'} fontSize={'.9rem'} bg={background}>
            <Box px={'15px'}>Code Editor</Box>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <HideButton />
                <ScaleButton />
                <CloseButton />
            </Flex>
        </Flex>
    )
}
