import { ReactNode } from 'react'
import { Provider } from 'jotai'

export const withAtom = (component: () => ReactNode) => () => <Provider>{component()}</Provider>
