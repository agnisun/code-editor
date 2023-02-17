import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

interface ViewProps {
    startResizing: () => void
}

export const View: FC<ViewProps> = ({ startResizing }) => {
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

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
            <Box bg={borders.color} w={borders.size} />
        </Flex>
    )
}
