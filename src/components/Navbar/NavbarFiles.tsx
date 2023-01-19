import { Box } from '@chakra-ui/react'
import { NavbarDirectory } from '@components/Navbar/NavbarDirectory'
import { NavbarFile } from '@components/Navbar/NavbarFile'
import { IFile } from './Navbar'
import { FC } from 'react'

interface NavbarFilesProps {
    files: IFile[]
}

export const NavbarFiles:FC<NavbarFilesProps> = ({ files }) => {
    return (
        <Box>
            {files.map((file) => {
                if (file.kind === 'directory') {
                    return <NavbarDirectory key={file.id} directory={file} files={file.children} />
                }

                return <NavbarFile key={file.id} file={file} />
            })}
        </Box>
    )
}
