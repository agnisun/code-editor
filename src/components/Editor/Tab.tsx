import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { selectedFilesAtom } from '@state/source'
import { TabItem } from '@components/Editor/TabItem'

export const Tab = () => {
    const [selectedFiles] = useAtom(selectedFilesAtom)

    return (
        <Flex
            bg={'#222'}
            h={'47px'}
            borderBottom={'1px solid #fff'}
            overflowX={'auto'}
            overflowY={'hidden'}
            alignItems={'center'}
        >
            {selectedFiles.map((file) => (
                <TabItem key={file.id} file={file} />
            ))}
        </Flex>
    )
}
