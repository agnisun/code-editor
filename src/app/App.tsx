import './styles/main.css'
import { Flex } from '@chakra-ui/react'
import { withProviders } from './providers'
import { Titlebar } from '@features/titlebar'
import { Toolsbar } from '@features/toolsbar'
import { Navbar } from '@widgets/navbar'
import { Loader } from '@features/loader'
import { Editor } from '@widgets/editor'

const App = () => {
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

export default withProviders(App)
