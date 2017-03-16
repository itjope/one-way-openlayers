// @flow
import ol from 'openlayers'
import type {Format} from './types'

const MVT = ol.format.MVT

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
