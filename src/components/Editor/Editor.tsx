import { Box } from '@chakra-ui/react'
import { CodeArea } from './CodeArea'
import { Tab } from './Tab'

export const Editor = () => {
    return (
        <Box flex={'1'} minW={'30px'} bg={'#444'} h={'100%'}>
            <Tab />
            <Box as={'main'} overflowY={'auto'} height={'calc(100vh - 131px)'} bg={'#2E3235'}>
                <CodeArea />
            </Box>
        </Box>
    )
}
