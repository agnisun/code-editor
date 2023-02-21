import { Flex, FlexProps } from '@chakra-ui/react'
import { FC } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

interface ViewProps extends FlexProps {
    isSelected?: boolean
    isActive?: boolean
    isResizing: boolean
}

export const View: FC<ViewProps> = ({
    isActive = false,
    isSelected = false,
    isResizing,
    style,
    children,
    ...props
}) => {
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
            border={`1px solid ${isActive ? '#007FD4' : 'transparent'}`}
            p={'5px'}
            style={style}
            {...props}
        >
            {children}
        </Flex>
    )
}
