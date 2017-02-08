// @flow
import changesets from 'diff-json'
import type {Layer, Change, Diff} from './types'
import parseLayer from './parseLayer'

const layersRenderer = (map: Object, getProps: Function): Function =>  (layers: Layer[]): void => {

  const getLayerByKey = (key: string): Layer => layers[parseInt(key)]

  const getLayerFromChange = (layers: Layer[]): Function => (change: Change): Layer => layers[getChangeIndex(change)]

  const getChangeIndex = (change: Change): number => parseInt(change.key)

  const typeFilter = (type: string): Function => (obj: *): boolean => {
    return type === obj.type
  }

  const addLayer = (layer: Layer): void => {
    map.addLayer(parseLayer(layer))
  }

  const removeLayers = (layers: Layer[], diff: Diff): void => {
    const olLayers = map.getLayers()
    const removedIndexes = diff.changes
      .filter(typeFilter('remove'))
      .map(change => parseInt(change.key))

    removedIndexes
      .map(index => olLayers.item(index))
      .forEach(olLayer => olLayers.remove(olLayer))
  }

  const updateLayer = (layer: Layer, index: number) => {
    const olLayers = map.getLayers()
    olLayers.removeAt(index)
    olLayers.insertAt(index, parseLayer(layer))
  }

  const addLayers = (layers: Layer[], diff: Diff): void => {
    diff.changes
      .filter(typeFilter('add'))
      .map(getLayerFromChange(layers))
      .forEach(addLayer)
  }

  const updateLayers = (layers: Layer[], diff: Diff): void => {
    diff.changes
      .filter(typeFilter('update'))
      .forEach((change: Change) => {
        updateLayer(getLayerFromChange(layers)(change), getChangeIndex(change))
      })
  }

  const applyDiffUpdate = (layers: Layer[]): Function => (diff: Diff): void => {
    updateLayers(layers, diff)
    removeLayers(layers, diff)
    addLayers(layers, diff)
  }

  const applyDiff = (prevLayers: Layer[], layers: Layer[]): void => {
    const diffs: Diff[] = changesets.diff(prevLayers, layers)

    diffs
      .filter(typeFilter('update'))
      .forEach(applyDiffUpdate(layers))
  }

  applyDiff(getProps().layers, layers)
}

export default layersRenderer
