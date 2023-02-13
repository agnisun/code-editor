import { Icon, IconButton } from '@chakra-ui/react'
import { AiOutlineFolderOpen } from 'react-icons/ai'
import { useTools } from '@features/navbar-tools'

export const FolderButton = () => {
    const { loadProject } = useTools()

    const handleOnClick = () => {
        loadProject()
    }

    return (
        <IconButton
            variant={'toolsbar'}
            onClick={handleOnClick}
            icon={<Icon as={AiOutlineFolderOpen} />}
            aria-label={'Open folder'}
        />
    )
}
