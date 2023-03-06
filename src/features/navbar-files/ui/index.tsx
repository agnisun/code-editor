import { useAtom } from 'jotai'
import { CSSProperties, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { isHideAtom } from '@entities/navbar'
import { openedNodesAtom } from '@entities/source'
import { IDirectory, IFile } from '@shared/types'
import { NavbarFile } from '@entities/file'
import { NavbarDirectory } from '@entities/directory'
import { ContextMenu, contextMenuAtom } from '@entities/context-menu'

export const View = () => {
    const [isNavbarHide] = useAtom(isHideAtom)
    const [openedNodes] = useAtom(openedNodesAtom)
    const [contextMenu] = useAtom(contextMenuAtom)
    const { isActive } = contextMenu

    const NavbarRow = useCallback(
        ({ index, style }: { index: number; style: CSSProperties }) => {
            const file = openedNodes[index]

            if (file.kind === 'directory') {
                return <NavbarDirectory index={index} directory={file as IDirectory} style={style} />
            }

            return <NavbarFile index={index} file={file as IFile} style={style} />
        },
        [openedNodes]
    )

    return (
        <>
            <Box display={isNavbarHide ? 'none' : 'block'} h={'calc(100vh - 131px)'}>
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={height}
                            itemCount={openedNodes.length}
                            itemSize={32}
                            width={width}
                            itemKey={(index) => openedNodes[index].path}
                            className={'main-scroll'}
                            style={{ overflow: isActive ? 'hidden' : 'auto' }}
                        >
                            {NavbarRow}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </Box>
            <ContextMenu />
        </>
    )
}
