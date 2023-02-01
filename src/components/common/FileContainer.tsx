import { FC } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@state/navbar'

export const FileContainer: FC<FlexProps> = ({ children, style, ...props }) => {
    const [isResizing] = useAtom(isResizingAtom)

    return (
        <Flex
            alignItems={'center'}
            gap={'5px'}
            cursor={'pointer'}
            _hover={!isResizing ? { background: '#9ca3af' } : undefined}
            p={'5px'}
            style={style}
            {...props}
        >
            {children}
        </Flex>
    )
}
