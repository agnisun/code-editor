import { CSSProperties, FC, MouseEvent } from 'react'
import { Box, Icon } from '@chakra-ui/react'
import { FcFolder } from 'react-icons/fc'
import { IDirectory } from '@shared/types'
import { useAtom } from 'jotai'
import { isResizingAtom } from '@entities/navbar'
import { useDirectories } from '../model'
import { FileContainer } from '@shared/ui'

interface ViewProps {
    directory: IDirectory
    index: number
    style?: CSSProperties
}

export const View: FC<ViewProps> = ({ directory, index, style = undefined }) => {
    const { handleExpand } = useDirectories()
    const { depth, name } = directory
    const [isResizing] = useAtom(isResizingAtom)

    const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        handleExpand(directory, index)
    }

    return (
        <>
            <FileContainer
                onClick={handleOnClick}
                isResizing={isResizing}
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
