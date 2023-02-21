import { CSSProperties, FC, MouseEvent } from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { IDirectory } from '@shared/types'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useDirectories } from '../model'
import { FileContainer } from '@shared/ui'
import { contextEntityAtom, useContextMenu } from '@entities/context-menu/model/context-menu'

interface ViewProps {
    directory: IDirectory
    index: number
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ directory, index, style = undefined }) => {
    const [isResizing] = useAtom(isResizingAtom)
    const [contextEntity] = useAtom(contextEntityAtom)
    const { onOpen } = useContextMenu()
    const { handleExpand } = useDirectories()
    const { depth, name, kind, path, id } = directory

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        handleExpand(directory, index)
    }

    const handleOnContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        const { pageX, pageY } = e
        onOpen({ kind, path, depth, id, index }, { isActive: true, pageX, pageY })
    }

    return (
        <>
            <FileContainer
                onClick={handleOnClick}
                onContextMenu={handleOnContextMenu}
                isResizing={isResizing}
                isActive={contextEntity.id === id}
                style={{ ...style, paddingLeft: `${depth ? depth * 20 : 5}px` }}
            >
                <Icon as={FcFolder} />
                <Box whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'}>
                    {name}
                </Box>
            </FileContainer>
        </>
    )
}
