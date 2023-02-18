import { CSSProperties, FC } from 'react'
import annotate from '@shared/img/icons/annotate.svg'
import tsx from '@shared/img/icons/tsx.svg'
import jsx from '@shared/img/icons/jsx.svg'
import js from '@shared/img/icons/js.svg'
import ts from '@shared/img/icons/ts.svg'
import rs from '@shared/img/icons/repl_dark.svg'
import css from '@shared/img/icons/css.svg'
import html from '@shared/img/icons/html5.svg'
import git from '@shared/img/icons/git.svg'
import image from '@shared/img/icons/image.svg'
import text from '@shared/img/icons/text.svg'
import json from '@shared/img/icons/json.svg'
import vue from '@shared/img/icons/vue.svg'

interface ViewProps {
    fileName: string
    style?: CSSProperties
}

interface Icons {
    [key: string]: string
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

export const View: FC<ViewProps> = ({
    fileName,
    style = { width: '18px', userSelect: 'none', pointerEvents: 'none', flexShrink: 0 },
}) => {
    const lastDotIndex = fileName.lastIndexOf('.')
    const ext = lastDotIndex !== -1 ? fileName.slice(lastDotIndex + 1).toLowerCase() : 'none'

    if (ext !== 'none' && icons[ext as keyof Icons]) {
        return <img alt={''} src={icons[ext]} style={style} />
    }

    return <img alt={''} src={annotate} style={style} />
}
