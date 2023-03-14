import { Box, Flex, Icon } from '@chakra-ui/react'
import { BiError } from 'react-icons/bi'
import { FC } from 'react'

interface ErrorBoxProps {
    message: string
}

export const ErrorBox: FC<ErrorBoxProps> = ({ message }) => {
    return (
        <Box w={'100%'} h={'100%'} pos={'relative'}>
            <Box pos={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -50%)'}>
                <Flex w={'350px'} minH={'150'} flexDir={'column'} gap={'15px'}>
                    <Flex justifyContent={'center'}>
                        <Icon color={'yellow.400'} fontSize={'44px'} as={BiError} />
                    </Flex>
                    <Box textAlign={'center'}>{message[0].toUpperCase() + message.slice(1)}</Box>
                </Flex>
            </Box>
        </Box>
    )
}
