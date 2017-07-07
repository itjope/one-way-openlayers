// @flow
import ol from 'openlayers'

import assign from 'lodash/assign'
import type {Source} from './types'

import parseFormat from './parseFormat'
import parseTileGrid from './parseTileGrid'

const XYZ = ol.source.XYZ
const TileGrid = ol.tilegrid.TileGrid
const TileWMS = ol.source.TileWMS
const ImageWMS = ol.source.ImageWMS
const TileImage = ol.source.TileImage
const VectorTile = ol.source.VectorTile
const Vector = ol.source.Vector
const WMTS = ol.source.WMTS

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
    case 'WMTS':
      return createSource(WMTS)
    default:
      console.warn('No source parser found for', sourceOptions.type)
      return {}
  }
}


export default parseSource
