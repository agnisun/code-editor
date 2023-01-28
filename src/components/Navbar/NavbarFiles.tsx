import { NavbarDirectory } from '@components/Navbar/NavbarDirectory'
import { NavbarFile } from '@components/Navbar/NavbarFile'
import { IFile } from './Navbar'
import { CSSProperties, FC, useCallback } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

interface NavbarFilesProps {
    files: IFile[]
}

export const NavbarFiles: FC<NavbarFilesProps> = ({ files }) => {
    const NavbarRow = useCallback(
        ({ index, style }: { index: number; style: CSSProperties }) => {
            const file = files[index]

            if (file.kind === 'directory') {
                return <NavbarDirectory style={style} key={file.id} directory={file} files={file.children} />
            }

            return <NavbarFile key={file.id} file={file} style={style} />
        },
        [files]
    )

    return (
        <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
                <FixedSizeList width={width} height={height} itemSize={32} itemCount={files.length}>
                    {NavbarRow}
                </FixedSizeList>
            )}
        </AutoSizer>
    )
}
