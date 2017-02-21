// @flow
import type { Layer } from './types'
import assign from 'lodash/assign'
import parseSource from './parseSource'
import Tile from 'ol/layer/tile'
import Vector from 'ol/layer/vector'
import Image from 'ol/layer/image'
import VectorTile from 'ol/layer/vectortile'

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
