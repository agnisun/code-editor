import { IFile } from '@shared/types'
import { FC } from 'react'
import { useFiles } from '@entities/file'
import { Box } from '@chakra-ui/react'
import { onUpdate, useCodeMirror } from '@entities/code/model'
import { writeFile } from '@shared/lib/filesys'

interface ViewProps {
    file: IFile
}

export const View: FC<ViewProps> = ({ file }) => {
    const { path } = file
    const { selectedFile } = useFiles()
    const visibility = selectedFile.path === path ? 'visible' : 'hidden'
    const height = selectedFile.path === path ? '100%' : '0'

    const handleOnChange = async (value: string) => {
        await writeFile(path, value)
    }

    useCodeMirror(file, [onUpdate(handleOnChange)])

    return <Box as={'main'} id={path} visibility={visibility} height={height} />
}
