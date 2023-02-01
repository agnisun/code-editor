import { FC } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'jotai'
import { theme } from '@theme/theme'

interface ProvidersProps {
    children: JSX.Element
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <Provider>
            <ChakraProvider resetCSS={true} theme={theme}>
                {children}
            </ChakraProvider>
        </Provider>
    )
}
