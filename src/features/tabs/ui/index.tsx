import { useAtom } from 'jotai'
import { Flex } from '@chakra-ui/react'
import { selectedFilesAtom } from '@entities/source'
import { useHorizontalScroll } from '../model'
import { TabItem } from '@entities/tab'

export const View = () => {
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
