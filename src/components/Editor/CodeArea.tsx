import { Box } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useSource } from '@hooks/useSource'
import { InitialCodeArea } from '@components/Editor/InitialCodeArea'
import { File } from '@utils/filesys'
import { useAtom } from 'jotai'
import { selectedFilesAtom } from '@state/source'
import { CodeItem } from '@components/Editor/CodeItem'

export const CodeArea = () => {
    const { selectedFile } = useSource()
    const [selectedFiles] = useAtom(selectedFilesAtom)
    const isImage = useCallback((file: File) => {
        return false
    }, [])
    
    if (!selectedFile.path) {
        return <InitialCodeArea/>
    }
    
    return (
        <Box height={'calc(100vh - 131px)'} bg={'#2E3235'}>
            {selectedFiles.map(file => {
                if (isImage(file)) return <div>image</div>
                
                return <CodeItem key={file.id} file={file}/>
            })}
        </Box>
    )
}
