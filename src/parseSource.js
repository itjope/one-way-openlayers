// @flow
import assign from 'lodash/assign'
import type {Source} from './types'
import XYZ from 'ol/source/xyz'
import TileGrid from 'ol/tilegrid/tilegrid'
import TileWMS from 'ol/source/tilewms'
import ImageWMS from 'ol/source/imagewms'
import TileImage from 'ol/source/tileimage'
import VectorTile from 'ol/source/vectortile'
import Vector from 'ol/source/vector'

import parseFormat from './parseFormat'
import parseTileGrid from './parseTileGrid'

const sourceCreator = (sourceOptions: Source): Function => (sourceClass: Class<*>): Object => {
  const tileGrid = sourceOptions.tileGrid ? parseTileGrid(sourceOptions.tileGrid) : undefined
  const format = sourceOptions.format ? parseFormat(sourceOptions.format) : undefined
  return new sourceClass(assign({}, sourceOptions, {
    tileGrid: tileGrid,
    format: format
  }))
}

const parseSource = (sourceOptions: Source): Object => {
  const createSource = sourceCreator(sourceOptions)
  switch (sourceOptions.type) {
    case 'XYZ':
      return createSource(XYZ)
    case 'TileWMS':
      return createSource(TileWMS)
    case 'ImageWMS':
      return createSource(ImageWMS)
    case 'TileImage':
      return createSource(TileImage)
    case 'VectorTile':
      return createSource(VectorTile)
    case 'Vector':
      return createSource(Vector)
    default:
      console.warn('No source parser found for', sourceOptions.type)
      return {}
  }
}


export default parseSource
