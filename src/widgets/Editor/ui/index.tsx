import { Box } from '@chakra-ui/react'
import { Tabs } from '@features/tabs'
import { CodeArea } from '@features/code-area'

export const View = () => {
    return (
        <Box flex={'1'} minW={'30px'} bg={'#444'} h={'100%'}>
            <Tabs />
            <CodeArea />
        </Box>
    )
}
