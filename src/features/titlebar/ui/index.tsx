import { Box, Flex } from '@chakra-ui/react'
import { CloseButton, HideButton, ScaleButton } from './buttons'

export const View = () => {
    return (
        <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'} fontSize={'.9rem'} bg={'#111'}>
            <Box px={'15px'}>Code Editor</Box>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <HideButton />
                <ScaleButton />
                <CloseButton />
            </Flex>
        </Flex>
    )
}
