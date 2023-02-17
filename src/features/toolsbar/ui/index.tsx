import { Box, Flex, Icon, IconButton, Popover, PopoverTrigger } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'
import { SettingsModal } from './modals/settings-modal'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'
import { projectAtom } from '@entities/source'

export const View = () => {
    const [project] = useAtom(projectAtom)
    const [theme] = useAtom(themeAtom)
    const {
        body: { color },
        toolsbar: { background },
        borders,
    } = theme

    return (
        <Popover placement={'bottom-start'}>
            <Flex
                color={color}
                bg={background}
                alignItems={'center'}
                p={'5px'}
                borderTop={`1px solid ${borders.color}`}
                borderBottom={`1px solid ${borders.color}`}
            >
                <Box flex={'1 1 auto'} overflow={'hidden'} whiteSpace={'nowrap'}>
                    <Box textOverflow={'ellipsis'} overflow={'hidden'}>
                        {project.project_path}
                    </Box>
                </Box>
                <Flex gap={'5px'}>
                    <PopoverTrigger>
                        <IconButton
                            size={'sm'}
                            variant={'toolsbar'}
                            aria-label={'Settings'}
                            icon={<Icon as={MdSettings} />}
                            _hover={{ border: `1px solid ${borders.color}` }}
                        />
                    </PopoverTrigger>
                </Flex>
            </Flex>
            <SettingsModal />
        </Popover>
    )
}
