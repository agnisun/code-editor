import { ReactNode } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { baseTheme } from '../styles/theme'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const withChakra = (component: () => ReactNode) => () => {
    const [theme] = useAtom(themeAtom)
    baseTheme.styles.global.body.color = theme.body.color

    const chakraTheme = extendTheme(baseTheme)

    return (
        <ChakraProvider resetCSS={true} theme={chakraTheme}>
            {component()}
        </ChakraProvider>
    )
}
