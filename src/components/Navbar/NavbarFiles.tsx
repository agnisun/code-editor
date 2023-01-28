import { NavbarDirectory } from '@components/Navbar/NavbarDirectory'
import { NavbarFile } from '@components/Navbar/NavbarFile'
import { CSSProperties, useCallback, useMemo } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useAtom } from 'jotai'
import { projectAtom } from '@state/source'
import { Directory, File } from '@utils/filesys'

export const NavbarFiles = () => {
    const [project] = useAtom(projectAtom)
    const { files, directories } = project

    const projectFiles = useMemo<(File | Directory)[]>(() => {
        return [].concat(directories as never[], files as never[])
    }, [project])

    const NavbarRow = useCallback(
        ({ index, style }: { index: number; style: CSSProperties }) => {
            const file = projectFiles[index]

            if (file.kind === 'directory') {
                return <NavbarDirectory style={style} key={file.id} directory={file} />
            }

            return <NavbarFile key={file.id} file={file} style={style} />
        },
        [project]
    )

    return (
        <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
                <FixedSizeList width={width} height={height} itemSize={32} itemCount={projectFiles.length}>
                    {NavbarRow}
                </FixedSizeList>
            )}
        </AutoSizer>
    )
}
