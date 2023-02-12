import { Flex } from '@chakra-ui/react'
import { Editor } from '@components/Editor/Editor'
import { Navbar } from '@components/Navbar/Navbar'
import { Titlebar } from '@components/Titlebar/Titlebar'
import { Toolsbar } from '@components/Toolsbar/Toolsbar'
import { Loader } from '@components/common/Loader'

export const App = () => {
    return (
        <>
            <Titlebar />
            <Toolsbar />
            <Flex w={'100vw'} overflow={'hidden'} h={'calc(100vh - 84px)'}>
                <Navbar />
                <Editor />
            </Flex>
            <Loader />
        </>
    )
}
