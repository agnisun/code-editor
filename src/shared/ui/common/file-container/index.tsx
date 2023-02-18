import { Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

interface ViewProps extends FlexProps {
    isSelected?: boolean
    isResizing: boolean
}

export const View: FC<ViewProps> = ({ isSelected = false, isResizing, style, children, ...props }) => {
    const [theme] = useAtom(themeAtom)
    const {
        navbar: { hover, active },
    } = theme

    return (
        <Flex
            alignItems={'center'}
            gap={'5px'}
            cursor={'pointer'}
            _hover={!isSelected && !isResizing ? hover : undefined}
            background={isSelected ? (active.background as string) : 'transparent'}
            p={'5px'}
            style={style}
            {...props}
        >
            {children}
        </Flex>
    )
}
