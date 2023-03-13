import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { markdown } from '@codemirror/lang-markdown'
import { cpp } from '@codemirror/lang-cpp'
import { php } from '@codemirror/lang-php'
import { xml } from '@codemirror/lang-xml'
import { rust } from '@codemirror/lang-rust'
import { LanguageSupport } from '@codemirror/language'

interface ILanguage {
    [key: string]: () => LanguageSupport
}

export const language: ILanguage = {
    js: javascript,
    java: java,
    html: html,
    css: css,
    md: markdown,
    cpp: cpp,
    php: php,
    xml: xml,
    rs: rust,
}
