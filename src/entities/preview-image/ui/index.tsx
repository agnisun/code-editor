import { Flex } from '@chakra-ui/react'
import { useFiles } from '@entities/file'
import { FC, useRef } from 'react'
import { IFile } from '@shared/types'
import { convertFileSrc } from '@tauri-apps/api/tauri'


interface ViewProps {
    file: IFile
}

export const View:FC<ViewProps> = ({file}) => {
    const {id} = file
    const {selectedFile} = useFiles()
    const imgRef = useRef<HTMLImageElement>(null)
    const height = selectedFile.id === id ? '100%' : '0'
    const visibility = selectedFile.id === id ? 'visible': 'hidden'
    
    return (
        <Flex h={height} visibility={visibility} alignItems={'center'} justifyContent={'center'}>
            <img ref={imgRef} src={convertFileSrc(file.path.slice(0, -1))} alt={file.name}/>
        </Flex>
    )
}