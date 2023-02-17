import { Box } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { selectedFilesAtom } from '@entities/source'
import { useCallback } from 'react'
import { IFile } from '@shared/types'
import { useFiles } from '@entities/file'
import { CodeItem } from '@entities/code'
import { View as InitialCodeArea } from './initial-code-area'
import { PreviewImage } from '@entities/preview-image'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const { body } = theme
    const { selectedFile } = useFiles()
    const [selectedFiles] = useAtom(selectedFilesAtom)
    const isImage = useCallback((file: IFile) => {
        return ['.png', '.ico', '.icns', '.tiff', '.webp', '.gif', '.jpeg', '.jpg', '.bmp'].some(
            (ext) => file.name.lastIndexOf(ext) !== -1
        )
    }, [])

    if (!selectedFile.path) {
        return <InitialCodeArea />
    }

    return (
        <Box height={'calc(100vh - 131px)'} bg={body.background} key={theme.id}>
            {selectedFiles.map((file) => {
                if (isImage(file)) return <PreviewImage key={file.id} file={file} />

                return <CodeItem key={file.id} file={file} />
            })}
        </Box>
    )
}
