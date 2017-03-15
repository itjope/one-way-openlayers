// @flow
import assign from 'lodash/assign'
import TileGridClass from 'ol/tilegrid/tilegrid'
import TileGrid from 'ol/tilegrid'

const tileGridCreator = (tileGridOptions: Object): Function => (tileGridClass: Class<*>): Object => {
  return new tileGridClass(tileGridOptions)
}

const parseTileGrid = (tileGridOptions: Object): Object => {
  const createTileGrid = tileGridCreator(tileGridOptions)
  switch (tileGridOptions.type) {
    case 'XYZ':
      return TileGrid.createXYZ(tileGridOptions)
    default:
      return createTileGrid(TileGridClass)
  }
}


export default parseTileGrid
