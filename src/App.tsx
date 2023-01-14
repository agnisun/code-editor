import { Box, Flex } from '@chakra-ui/react'
import { Editor } from '@components/Editor/Editor'
import { Navbar } from '@components/Navbar/Navbar'
import { Titlebar } from '@components/Titlebar/Titlebar'
import { Toolsbar } from '@components/Toolsbar/Toolsbar'

export const App = () => {
    return (
        <Box>
            <Titlebar />
            <Toolsbar />
            <Flex h={'100vh'} w={'100vw'} overflow={'hidden'}>
                <Navbar />
                <Editor />
            </Flex>
        </Box>
    )
}
