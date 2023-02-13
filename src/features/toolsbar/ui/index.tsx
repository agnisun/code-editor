import { Box, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'
import { SettingsModal } from './modals/SettingModal'

export const View = () => {
    const { onOpen, isOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex
                bg={'#111'}
                alignItems={'center'}
                p={'5px'}
                borderTop={'1px solid #fff'}
                borderBottom={'1px solid #fff'}
            >
                <Box flex={'1 1 auto'}>Path</Box>
                <Flex gap={'5px'}>
                    <IconButton
                        onClick={onOpen}
                        size={'sm'}
                        variant={'toolsbar'}
                        aria-label={'Settings'}
                        icon={<Icon as={MdSettings} />}
                    />
                </Flex>
            </Flex>
            <SettingsModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
