import { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

export const withChakra = (component: () => ReactNode) => () =>
    (
        <ChakraProvider resetCSS={true} theme={theme}>
            {component()}
        </ChakraProvider>
    )
