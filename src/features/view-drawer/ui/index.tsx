import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'
import { contextEntityAtom, contextMenuAtom } from '@entities/context-menu'
import { projectAtom } from '@entities/source'

interface ViewProps {
    startResizing: () => void
}

export const View: FC<ViewProps> = ({ startResizing }) => {
    const [theme] = useAtom(themeAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextMenu] = useAtom(contextMenuAtom)
    const [project] = useAtom(projectAtom)
    const { isActive } = contextMenu
    const { borders } = theme
    const isMainMenuActive = contextEntity.path === project.project_path && isActive

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
            <Box w={'1px'} bg={isMainMenuActive ? 'transparent' : borders.color} />
        </Flex>
    )
}
