import compose from 'compose-function'
import { withAtom } from './with-atom'
import { withChakra } from './with-chakra'

export const withProviders = compose(withAtom, withChakra)
