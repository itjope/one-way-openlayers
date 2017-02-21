// @flow
import assign from 'lodash/assign'
import type {Source} from './types'
import XYZ from 'ol/source/xyz'
import TileGrid from 'ol/tilegrid/tilegrid'
import TileWMS from 'ol/source/tilewms'
import ImageWMS from 'ol/source/imagewms'
import TileImage from 'ol/source/tileimage'
import VectorTile from 'ol/source/vectortile'

import parseFormat from './parseFormat'

const createSource = (sourceClass: Class<*>, sourceOptions: Source): Object => {
  const tileGrid = sourceOptions.tileGrid ? new TileGrid(sourceOptions.tileGrid) : undefined
  const format = sourceOptions.format ? parseFormat(sourceOptions.format) : undefined
  return new sourceClass(assign({}, sourceOptions, {
    tileGrid: tileGrid,
    format: format
  }))
}

const parseSource = (sourceOptions: Source): Object => {
  switch (sourceOptions.type) {
    case 'XYZ':
      return createSource(XYZ, sourceOptions)
    case 'TileWMS':
      return createSource(TileWMS, sourceOptions)
    case 'ImageWMS':
      return createSource(ImageWMS, sourceOptions)
    case 'TileImage':
      return createSource(TileImage, sourceOptions)
    case 'VectorTile':
      return createSource(VectorTile, sourceOptions)
    default:
      console.warn('No source parser found for', sourceOptions.type)
      return {}
  }
}


export default parseSource
