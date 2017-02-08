// @flow
export type View = {
  center: [number, number],
  zoom: number
}

export type Source = {
  'type': 'BingMaps' | 'CartoDB' | 'Cluster' | 'Image' | 'ImageArcGISRest' | 'ImageCanvas' | 'ImageMapGuide' | 'ImageStatic' | 'ImageVector' | 'ImageWMS' | 'OSM' | 'Raster' | 'Source' | 'Stamen' | 'Tile' | 'TileArcGISRest' | 'TileDebug' | 'TileImage' | 'TileJSON' | 'TileUTFGrid' | 'TileWMS' | 'UrlTile' | 'Vector' | 'VectorTile' | 'WMTS' | 'XYZ' | 'Zoomify'
}

export type VectorLayer = {
  'type': 'Vector',
  source: Source
}

export type TileLayer = {
  'type': 'Tile',
  source: Source
}

export type Layer = VectorLayer | TileLayer

export type Props = {
  view: View,
  layers: Layer[],
  events?: Events
}

export type Options = {
  target: string,
  renderer: 'canvas' | 'webgl',
  props: Props
}

export type State = {
  map: Function,
  props: Props
}

export type Events = Object

export type Change = {
  type: 'add' | 'update' | 'remove',
  key: string,
  value: Layer | Events
}

export type Diff = {
  type: 'add' | 'update' | 'remove',
  changes: Change[]
}
