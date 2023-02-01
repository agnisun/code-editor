import { CSSProperties, useCallback } from 'react'
import { useAtom } from 'jotai'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { Box } from '@chakra-ui/react'
import { isNavbarHideAtom } from '@state/navbar'
import { NavbarDirectory } from '@components/Navbar/NavbarDirectory'
import { NavbarFile } from '@components/Navbar/NavbarFile'
import { openedNodesAtom } from '@state/source'

export const NavbarFiles = () => {
    const [isNavbarHide] = useAtom(isNavbarHideAtom)
    const [openedNodes] = useAtom(openedNodesAtom)

    const NavbarRow = useCallback(
        ({ index, style }: { index: number; style: CSSProperties }) => {
            const file = openedNodes[index]

            if (file.kind === 'directory') {
                return <NavbarDirectory index={index} directory={file} style={style} />
            }

            return <NavbarFile file={file} style={style} />
        },
        [openedNodes]
    )

    return (
        <Box display={isNavbarHide ? 'none' : 'block'} h={'calc(100vh - 131px)'}>
            <AutoSizer>
                {({ height, width }) => (
                    <FixedSizeList
                        height={height}
                        itemCount={openedNodes.length}
                        itemSize={32}
                        width={width}
                        itemKey={(index) => openedNodes[index].id}
                    >
                        {NavbarRow}
                    </FixedSizeList>
                )}
            </AutoSizer>
        </Box>
    )
}
