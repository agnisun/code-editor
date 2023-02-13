import { extendTheme } from '@chakra-ui/react'
import { Button } from './button'

export const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontSize: '18px',
                lineHeight: '1.2',
                fontFamily: 'Roboto',
                color: '#fff',
            },
        },
    },
    components: {
        Button,
    },
})
