import { Box } from '@chakra-ui/react'
import { Tabs } from '@features/tabs'
import { CodeArea } from '@features/code-area'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const {
        body: { color },
    } = theme

    return (
        <Box flex={'1'} minW={'30px'} color={color} h={'100%'}>
            <Tabs />
            <CodeArea />
        </Box>
    )
}
