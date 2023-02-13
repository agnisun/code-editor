import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
    baseStyle: {},
    sizes: {},
    variants: {
        titlebar: {
            fontSize: '15px',
            borderRadius: 'none',
            _hover: {
                background: 'rgb(255, 255, 255, 0.2)',
            },
        },
        toolsbar: {
            fontSize: '18px',
            borderRadius: '5px',
            _hover: {
                border: '1px solid #fff',
            },
        },
    },
    defaultProps: {},
})
