import { ReactNode } from 'react'
import { Provider } from 'jotai'

export const withAtom = (component: () => ReactNode) =>
    function AtomProvider() {
        return <Provider>{component()}</Provider>
    }
