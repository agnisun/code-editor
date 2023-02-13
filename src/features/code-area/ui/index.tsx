import { Box, Icon, IconProps } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { selectedFilesAtom } from '@entities/source'
import { useCallback } from 'react'
import { IFile } from '@shared/types'
import { useFiles } from '@entities/file'
import { CodeItem } from '@entities/code'

const InitialCodeArea = () => {
    const LogoIcon = useCallback((props: IconProps) => {
        return (
            <Icon viewBox="0 0 19 13" {...props} boxSize={20}>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-180.000000, -3283.000000)"
                        fill={props.color as string}
                    >
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                                d="M129.204085,3126.419 C129.587463,3126.032 129.587463,3125.405 129.204085,3125.018 L129.191207,3125.005 C128.807829,3124.618 128.186697,3124.618 127.803319,3125.005 L124.287534,3128.553 C123.904155,3128.94 123.904155,3129.568 124.287534,3129.955 L127.803319,3133.503 C128.186697,3133.89 128.807829,3133.89 129.191207,3133.503 L129.204085,3133.49 C129.587463,3133.103 129.587463,3132.476 129.204085,3132.089 L127.090057,3129.955 C126.706679,3129.568 126.706679,3128.94 127.090057,3128.553 L129.204085,3126.419 Z M142.712466,3128.553 L139.196681,3125.005 C138.814294,3124.618 138.192171,3124.618 137.808793,3125.005 L137.795915,3125.018 C137.412537,3125.405 137.412537,3126.032 137.795915,3126.419 L139.910934,3128.553 C140.294312,3128.94 140.294312,3129.568 139.910934,3129.955 L137.795915,3132.089 C137.412537,3132.476 137.412537,3133.103 137.795915,3133.49 L137.808793,3133.503 C138.192171,3133.89 138.814294,3133.89 139.196681,3133.503 L142.712466,3129.955 C143.095845,3129.568 143.095845,3128.94 142.712466,3128.553 L142.712466,3128.553 Z M136.809359,3124.40817 L131.74698,3135.23866 C131.582981,3135.57915 131.295245,3136 130.924037,3136 L130.904396,3136 C130.182602,3136 129.712209,3135.0197 130.031369,3134.3588 L135.064287,3123.63077 C135.228287,3123.29128 135.836165,3123.02511 135.836165,3123.02511 L135.836165,3123 C136.818198,3123 137.127538,3123.74728 136.809359,3124.40817 L136.809359,3124.40817 Z"
                                id="code-[#1115]"
                            ></path>
                        </g>
                    </g>
                </g>
            </Icon>
        )
    }, [])

    return (
        <Box height={'calc(100vh - 131px)'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <LogoIcon color={'#fff'} opacity={'.4'} />
        </Box>
    )
}

export const View = () => {
    const { selectedFile } = useFiles()
    const [selectedFiles] = useAtom(selectedFilesAtom)
    const isImage = useCallback((file: IFile) => {
        return false
    }, [])

    if (!selectedFile.path) {
        return <InitialCodeArea />
    }

    return (
        <Box height={'calc(100vh - 131px)'} bg={'#2E3235'}>
            {selectedFiles.map((file) => {
                if (isImage(file)) return <div>image</div>

                return <CodeItem key={file.id} file={file} />
            })}
        </Box>
    )
}
