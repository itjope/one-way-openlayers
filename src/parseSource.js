// @flow
import assign from 'lodash/assign'
import type {Source} from './types'
import XYZ from 'ol/source/xyz'
import TileGrid from 'ol/tilegrid/tilegrid'
import TileWMS from 'ol/source/tilewms'
import ImageWMS from 'ol/source/imagewms'

const createSource = (sourceClass: Class<*>, sourceOptions: Source): Object => {
  const tileGrid = sourceOptions.tileGrid ? new TileGrid(sourceOptions.tileGrid) : undefined
  return new sourceClass(assign({}, sourceOptions, {
    tileGrid: tileGrid
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
    default:
      console.warn('No source parser found for', sourceOptions.type)
      return {}
  }
}


export default parseSource
