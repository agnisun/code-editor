import { Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'

interface ViewProps extends FlexProps {
    isSelected?: boolean
    isResizing: boolean
}

export const View: FC<ViewProps> = ({ isSelected = false, isResizing, style, children, ...props }) => {
    return (
        <Flex
            alignItems={'center'}
            gap={'5px'}
            cursor={'pointer'}
            _hover={!isSelected && !isResizing ? { background: 'rgba(55, 55, 61, .5)' } : undefined}
            background={isSelected ? '#37373D' : 'transparent'}
            p={'5px'}
            style={style}
            {...props}
        >
            {children}
        </Flex>
    )
}
