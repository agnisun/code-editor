import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'

interface ViewDrawerProps {
    startResizing: () => void
}

export const ViewDrawer: FC<ViewDrawerProps> = ({ startResizing }) => {
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
            <Box bg={'#fff'} w={'1px'} />
        </Flex>
    )
}
