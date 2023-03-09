import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

interface ViewProps {
    startResizing: () => void
}

export const View: FC<ViewProps> = ({ startResizing }) => {
    return (
        <Flex
            justifyContent={'flex-end'}
            _hover={{ cursor: 'ew-resize' }}
            w={'5px'}
            pos={'absolute'}
            top={0}
            right={0}
            h={'100%'}
            onMouseDown={startResizing}
        >
            <Box w={'1px'} />
        </Flex>
    )
}
