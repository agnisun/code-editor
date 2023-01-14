import { Box, Flex, Icon, IconButton } from '@chakra-ui/react'
import { MdSearch, MdSettings } from 'react-icons/md'

export const Toolsbar = () => {
    return (
        <Flex bg={'#111'} alignItems={'center'} p={'5px'} borderTop={'1px solid #fff'} borderBottom={'1px solid #fff'}>
            <Box flex={'1 1 auto'}>Path</Box>
            <Flex gap={'5px'}>
                <IconButton size={'sm'} variant={'toolsbar'} aria-label={'Search'} icon={<Icon as={MdSearch} />} />
                <IconButton size={'sm'} variant={'toolsbar'} aria-label={'Settings'} icon={<Icon as={MdSettings} />} />
            </Flex>
        </Flex>
    )
}
