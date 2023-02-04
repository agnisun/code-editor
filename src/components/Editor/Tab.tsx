import { Flex } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { selectedFilesAtom } from '@state/source'
import { TabItem } from '@components/Editor/TabItem'
import { useHorizontalScroll } from '@hooks/useHorizontalScroll'

export const Tab = () => {
    const [selectedFiles] = useAtom(selectedFilesAtom)
    const ref = useHorizontalScroll()

    return (
        <Flex
            className={'tab-scroll'}
            ref={ref}
            bg={'#222'}
            borderBottom={'1px solid #fff'}
            overflowX={'scroll'}
            overflowY={'hidden'}
            alignItems={'center'}
            h={'47px'}
        >
            {selectedFiles.map((file) => (
                <TabItem key={file.id} file={file} />
            ))}
        </Flex>
    )
}
