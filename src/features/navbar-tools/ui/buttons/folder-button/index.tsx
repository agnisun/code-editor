import { Icon, IconButton } from '@chakra-ui/react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { useTools } from '@features/navbar-tools'
import { useAtom } from 'jotai'
import { themeAtom } from '@entities/theme'

export const FolderButton = () => {
    const { loadProject } = useTools()
    const [theme] = useAtom(themeAtom)
    const { borders } = theme

    const handleOnClick = () => {
        loadProject()
    }

    return (
        <IconButton
            tabIndex={-1}
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={AiOutlineFolderOpen} />}
            aria-label={'Open folder'}
            _hover={{ border: `1px solid ${borders.color}` }}
        />
    )
}
