// @flow
import ol from 'openlayers'

import assign from 'lodash/assign'


const TileGridClass = ol.tilegrid.TileGrid
const WMTS = ol.tilegrid.WMTS
const tileGrid = ol.tilegrid

const tileGridCreator = (tileGridOptions: Object): Function => (tileGridClass: Class<*>): Object => {
  return new tileGridClass(tileGridOptions)
}

const parseTileGrid = (tileGridOptions: Object): Object => {
  const createTileGrid = tileGridCreator(tileGridOptions)
  switch (tileGridOptions.type) {
    case 'XYZ':
      return tileGrid.createXYZ(tileGridOptions)
    case 'WMTS':
      return createTileGrid(WMTS)
    default:
      return createTileGrid(TileGridClass)
  }
}


export default parseTileGrid
