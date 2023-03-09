import { Box, Flex } from '@chakra-ui/react'
import { CollapseButton, FolderButton, HideButton, PlusButton } from './buttons'
import { useAtom } from 'jotai'
import { isHideAtom } from '@entities/navbar'
import { themeAtom } from '@entities/theme'
import { projectAtom } from '@entities/source'

export const View = () => {
    const [project] = useAtom(projectAtom)
    const [isHide] = useAtom(isHideAtom)
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

    return (
        <Box overflowX={'hidden'} p={'3px 5px'} borderRight={`1px solid ${borders.color}`}>
            <Flex justifyContent={'space-between'}>
                <Flex gap={'5px'}>
                    {!isHide ? <FolderButton /> : <PlusButton />}
                    {(project.project_path || isHide) && <CollapseButton />}
                </Flex>
                <HideButton />
            </Flex>
        </Box>
    )
}
