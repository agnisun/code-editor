import { Box, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
import { MdSearch, MdSettings } from 'react-icons/md'
import { SettingsModal } from '@components/Modal/SettingsModal'
import { SearchModal } from '@components/Modal/SearchModal'

export const Toolsbar = () => {
    const settingsModal = useDisclosure()
    const searchModal = useDisclosure()

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
                        onClick={searchModal.onOpen}
                        size={'sm'}
                        variant={'toolsbar'}
                        aria-label={'Search'}
                        icon={<Icon as={MdSearch} />}
                    />
                    <IconButton
                        onClick={settingsModal.onOpen}
                        size={'sm'}
                        variant={'toolsbar'}
                        aria-label={'Settings'}
                        icon={<Icon as={MdSettings} />}
                    />
                </Flex>
            </Flex>
            <SettingsModal isOpen={settingsModal.isOpen} onClose={settingsModal.onClose} />
            <SearchModal isOpen={searchModal.isOpen} onClose={searchModal.onClose} />
        </>
    )
}
