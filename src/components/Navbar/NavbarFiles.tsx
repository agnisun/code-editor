import { List } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { projectDirectoriesAtom, projectFilesAtom } from '@state/source'
import { NavbarDirectory } from '@components/Navbar/NavbarDirectory'
import { NavbarFile } from '@components/Navbar/NavbarFile'

export const NavbarFiles = () => {
    const [directories] = useAtom(projectDirectoriesAtom)
    const [files] = useAtom(projectFilesAtom)

    return (
        <List overflowY={'auto'} h={'calc(100vh - 131px)'}>
            {directories.map((directory) => (
                <NavbarDirectory key={directory.id} directory={directory} />
            ))}
            {files.map((file) => (
                <NavbarFile key={file.id} file={file} />
            ))}
        </List>
    )
}
