import { useAtom } from 'jotai'
import { Flex } from '@chakra-ui/react'
import { selectedFilesAtom } from '@entities/source'
import { useHorizontalScroll } from '../model'
import { TabItem } from '@entities/tab'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const {
        borders,
        tabs: { background },
    } = theme
    const [selectedFiles] = useAtom(selectedFilesAtom)
    const ref = useHorizontalScroll()

    return (
        <Flex
            className={'tab-scroll'}
            ref={ref}
            bg={background}
            borderBottom={`1px solid ${borders.color}`}
            overflowX={'auto'}
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
