import { extendTheme } from '@chakra-ui/react'
import { Button } from './buttons'

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontSize: '18px',
                lineHeight: '1.2',
                fontFamily: 'Roboto',
                overflow: 'hidden',
                color: '#fff',
            },
        },
    },
    components: {
        Button,
    },
})
