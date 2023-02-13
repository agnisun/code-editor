import { Box, Flex, Icon, IconButton, Popover, PopoverTrigger } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'
import { SettingsModal } from './modals/settings-modal'

export const View = () => {
    return (
        <Popover placement={'bottom-start'}>
            <Flex
                bg={'#111'}
                alignItems={'center'}
                p={'5px'}
                borderTop={'1px solid #fff'}
                borderBottom={'1px solid #fff'}
            >
                <Box flex={'1 1 auto'}>Path</Box>
                <Flex gap={'5px'}>
                    <PopoverTrigger>
                        <IconButton
                            size={'sm'}
                            variant={'toolsbar'}
                            aria-label={'Settings'}
                            icon={<Icon as={MdSettings} />}
                        />
                    </PopoverTrigger>
                </Flex>
            </Flex>
            <SettingsModal />
        </Popover>
    )
}
