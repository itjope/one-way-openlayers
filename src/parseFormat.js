// @flow
import type {Format} from './types'

import MVT from 'ol/format/mvt'

const parseFormat = (formatOptions: Format): Object => {
  switch (formatOptions.type) {
    case 'MVT':
      return new MVT(formatOptions)
    default:
      console.warn('No format parser found for', formatOptions.type)
      return {}
  }
}


export default parseFormat
