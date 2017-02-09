// @flow
import type { Layer } from './types'
import assign from 'lodash/assign'
import parseSource from './parseSource'
import Tile from 'ol/layer/tile'
import Vector from 'ol/layer/vector'
import Image from 'ol/layer/Image'

const createLayer = (layerClass: Class<*>, layerOptions: Layer): Object => {
  return new layerClass(assign({}, layerOptions, {
    source: parseSource(layerOptions.source)
  }))
}

const parseLayer = (layer: Layer): Object => {
  switch (layer.type) {
    case 'Vector':
      return createLayer(Vector, layer)
    case 'Tile':
      return createLayer(Tile, layer)
    case 'Image':
      return createLayer(Image, layer)
    default:
      console.warn('No layer parser found for', layer.type)
      return {}
  }
}

export default parseLayer
