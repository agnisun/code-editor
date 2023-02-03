import { CSSProperties, FC } from 'react'
import tsx from '@img/icons/tsx.svg'
import jsx from '@img/icons/jsx.svg'
import js from '@img/icons/js.svg'
import ts from '@img/icons/ts.svg'
import rs from '@img/icons/repl_dark.svg'
import css from '@img/icons/css.svg'
import html from '@img/icons/html5.svg'
import git from '@img/icons/git.svg'
import image from '@img/icons/image.svg'
import text from '@img/icons/text.svg'
import json from '@img/icons/json.svg'
import annotate from '@img/icons/annotate.svg'
import vue from '@img/icons/vue.svg'

interface Icons {
    [key: string]: string
}

interface FileIconProps {
    fileName: string
    style?: CSSProperties
}

const icons: Icons = {
    tsx,
    jsx,
    js,
    ts,
    rs,
    css,
    html,
    gitignore: git,
    svg: image,
    png: image,
    jpg: image,
    jpeg: image,
    icns: image,
    ico: image,
    gif: image,
    webp: image,
    tiff: image,
    bmp: image,
    md: text,
    lock: text,
    json,
    vue,
}

export const FileIcon: FC<FileIconProps> = ({
    fileName,
    style = { width: '18px', userSelect: 'none', pointerEvents: 'none', flexShrink: 0 },
}) => {
    const lastDotIndex = fileName.lastIndexOf('.')
    const ext = lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1).toLowerCase() : 'NONE'

    if (icons[ext as keyof Icons]) {
        return <img alt={''} src={icons[ext]} style={style} />
    }

    return <img alt={''} src={annotate} style={style} />
}
