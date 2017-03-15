// @flow
export type View = {
  center: [number, number],
  zoom: number
}

export type Format = {
  type: 'MVT'
}

export type Source = {
  'type': 'BingMaps' | 'CartoDB' | 'Cluster' | 'Image' | 'ImageArcGISRest' | 'ImageCanvas' | 'ImageMapGuide' | 'ImageStatic' | 'ImageVector' | 'ImageWMS' | 'OSM' | 'Raster' | 'Source' | 'Stamen' | 'Tile' | 'TileArcGISRest' | 'TileDebug' | 'TileImage' | 'TileJSON' | 'TileUTFGrid' | 'TileWMS' | 'UrlTile' | 'Vector' | 'VectorTile' | 'WMTS' | 'XYZ' | 'Zoomify',
  format: Format,
  data?: ?Object,
  tileGrid?: ?Object,
  styleUrl?: ?string
}

export type VectorLayer = {
  'type': 'Vector',
  source: Source
}

export type TileLayer = {
  'type': 'Tile',
  source: Source
}

export type VectorTile = {
  'type': 'VectorTile',
  source: Source
}

export type Layer = VectorLayer | TileLayer | VectorTile

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
  map: Map,
  props: Props,
  eventReferences: MapOfEventReferences
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

export type EventReference = Object

export type MapOfEventReferences = {[key: string]: EventReference };

export type Map = {
  addControl: Function,
  addInteraction: Function,
  addLayer: Function,
  addOverlay: Function,
  changed: Function,
  dispatchEvent: Function,
  forEachFeatureAtPixel: Function,
  forEachLayerAtPixel: Function,
  get: Function,
  getControls: Function,
  getCoordinateFromPixel: Function,
  getEventCoordinate: Function,
  getEventPixel: Function,
  getInteractions: Function,
  getKeys: Function,
  getLayerGroup: Function,
  getLayers: Function,
  getOverlayById: Function,
  getOverlays: Function,
  getPixelFromCoordinate: Function,
  getProperties: Function,
  getRevision: Function,
  getSize: Function,
  getTarget: Function,
  getTargetElement: Function,
  getView: Function,
  getViewport: Function,
  hasFeatureAtPixel: Function,
  on: Function,
  once: Function,
  removeControl: Function,
  removeInteraction: Function,
  removeLayer: Function,
  removeOverlay: Function,
  render: Function,
  renderSync: Function,
  set: Function,
  setLayerGroup: Function,
  setProperties: Function,
  setSize: Function,
  setTarget: Function,
  setView: Function,
  un: Function,
  unset: Function,
  updateSize: Function
}

export type CRS = {
  type: string,
  properties: {
    code: number
  }
}
