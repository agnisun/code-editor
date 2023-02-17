import { ReactNode } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { baseTheme } from '../styles/theme'

export const withChakra = (component: () => ReactNode) => () => {
    const chakraTheme = extendTheme(baseTheme)

    return (
        <ChakraProvider resetCSS={true} theme={chakraTheme}>
            {component()}
        </ChakraProvider>
    )
}
