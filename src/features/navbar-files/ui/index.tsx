import { useAtom } from 'jotai'
import { CSSProperties, MouseEvent as ReactMouseEvent, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { isHideAtom } from '@entities/navbar'
import { openedNodesAtom, projectAtom } from '@entities/source'
import { IDirectory, IFile } from '@shared/types'
import { NavbarFile } from '@entities/file'
import { NavbarDirectory } from '@entities/directory'
import { contextEntityAtom, ContextMenu, contextMenuAtom, useContextMenu } from '@entities/context-menu'
import { IContextEntity } from '@entities/context-menu/model/context-menu'
import { themeAtom } from '@entities/theme'

export const View = () => {
    const [theme] = useAtom(themeAtom)
    const [isNavbarHide] = useAtom(isHideAtom)
    const [openedNodes] = useAtom(openedNodesAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const [contextMenu] = useAtom(contextMenuAtom)
    const [project] = useAtom(projectAtom)
    const { onOpen } = useContextMenu()
    const { isActive } = contextMenu
    const { borders } = theme
    const isMainMenuActive = contextEntity.path === project.project_path && isActive

    const NavbarRow = useCallback(
        ({ index, style }: { index: number; style: CSSProperties }) => {
            const file = openedNodes[index]

            if (file.kind === 'directory') {
                return <NavbarDirectory key={file.path} index={index} directory={file as IDirectory} style={style} />
            }

            return <NavbarFile key={file.path} index={index} file={file as IFile} style={style} />
        },
        [openedNodes]
    )

    const handleOnContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const { pageX, pageY } = e
        const projectPath = project.project_path.split('/')
        projectPath.pop()

        const projectDir: IContextEntity = {
            name: project.project_path.split('/').at(-2) || '',
            kind: 'directory',
            path: project.project_path,
            expanded: true,
            depth: -1,
            parent: projectPath.join('/'),
            index: -1,
        }
        onOpen({ ...projectDir }, { isActive: true, pageX, pageY })
    }

    return (
        <>
            <Box
                borderTop={`1px solid ${isMainMenuActive ? '#007FD4' : borders.color}`}
                borderRight={`1px solid ${isMainMenuActive ? '#007FD4' : borders.color}`}
                borderBottom={`1px solid ${isMainMenuActive ? '#007FD4' : 'transparent'}`}
                borderLeft={`1px solid ${isMainMenuActive ? '#007FD4' : 'transparent'}`}
                display={isNavbarHide ? 'none' : 'block'}
                h={'calc(100vh - 131px)'}
                onContextMenu={handleOnContextMenu}
            >
                <AutoSizer>
                    {({ height, width }) => (
                        <FixedSizeList
                            height={height}
                            itemCount={openedNodes.length}
                            itemSize={32}
                            width={width}
                            className={'main-scroll'}
                            style={{ overflow: isActive ? 'hidden' : 'auto', paddingBottom: '20px' }}
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
