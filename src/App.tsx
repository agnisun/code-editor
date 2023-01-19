import { Box, Flex } from '@chakra-ui/react'
import { Editor } from '@components/Editor/Editor'
import { Navbar } from '@components/Navbar/Navbar'
import { Titlebar } from '@components/Titlebar/Titlebar'
import { Toolsbar } from '@components/Toolsbar/Toolsbar'
import { Loader } from '@components/common/Loader'

export const App = () => {
    return (
        <>
            <Titlebar />
            <Box h={'100vh'} pt={'40px'}>
                <Toolsbar />
                <Flex w={'100vw'} overflow={'hidden'} h={'100%'}>
                    <Navbar />
                    <Editor />
                </Flex>
            </Box>
            <Loader />
        </>
    )
}
