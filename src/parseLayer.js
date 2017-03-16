// @flow
import ol from 'openlayers'

import type { Layer } from './types'
import assign from 'lodash/assign'
import parseSource from './parseSource'
const Tile =  ol.layer.Tile
const Vector = ol.layer.Vector
const Image = ol.layer.Image
const VectorTile = ol.layer.VectorTile

const layerCreator = (layerOptions: Layer): Function => (layerClass: Class<*>): Object => {
  return new layerClass(assign({}, layerOptions, {
    source: parseSource(layerOptions.source)
  }))
}

const parseLayer = (layerOptions: Layer): Object => {
  const createLayer = layerCreator(layerOptions)
  switch (layerOptions.type) {
    case 'Vector':
      return createLayer(Vector)
    case 'Tile':
      return createLayer(Tile)
    case 'Image':
      return createLayer(Image)
    case 'VectorTile':
      return createLayer(VectorTile)
    default:
      console.warn('No layer parser found for', layerOptions.type)
      return {}
  }
}

export default parseLayer
