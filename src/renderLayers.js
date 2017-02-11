// @flow
import changesets from 'diff-json'
import parseLayer from './parseLayer'
import type {Layer, Change, Diff, Map} from './types'

const getLayerFromChange = (layers: Layer[]): Function => (change: Change): Layer => {
  return layers[getChangeIndex(change)]
}

const getChangeIndex = (change: Change): number => {
  return parseInt(change.key)
}

const typeFilter = (type: string): Function => (obj: *): boolean => {
  return type === obj.type
}

const addLayer = (map: Map) => (layer: Layer): void => {
  map.addLayer(parseLayer(layer))
}

const removeLayers = (map: Map, layers: Layer[], diff: Diff): void => {
  const olLayers = map.getLayers()
  const removedIndexes = diff.changes
    .filter(typeFilter('remove'))
    .map(change => parseInt(change.key))

  removedIndexes
    .map(index => olLayers.item(index))
    .forEach(olLayer => olLayers.remove(olLayer))
}

const addLayers = (map: Map, layers: Layer[], diff: Diff): void => {
  diff.changes
    .filter(typeFilter('add'))
    .map(getLayerFromChange(layers))
    .forEach(addLayer(map))
}

const updateLayer = (map: Map, layer: Layer, index: number) => {
  const olLayers = map.getLayers()
  olLayers.removeAt(index)
  olLayers.insertAt(index, parseLayer(layer))
}

const updateLayers = (map: Map, layers: Layer[], diff: Diff): void => {
  diff.changes
    .filter(typeFilter('update'))
    .forEach((change: Change) => {
      updateLayer(map, getLayerFromChange(layers)(change), getChangeIndex(change))
    })
}

const renderLayers = (map: Map, prevLayers: Layer[], nextLayers: Layer[]): void => {
  const applyDiffUpdate = (diff: Diff): void => {
    updateLayers(map, nextLayers, diff)
    removeLayers(map, nextLayers, diff)
    addLayers(map, nextLayers, diff)
  }

  const diffs: Diff[] = changesets.diff(prevLayers, nextLayers)

  diffs
    .filter(typeFilter('update'))
    .forEach(applyDiffUpdate)
}

export default renderLayers
