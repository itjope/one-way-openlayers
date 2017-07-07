import OneWayOpenLayers from '../src'

const config = {
  view: {
    center: [0, 0],
    zoom: 1
  },
  layers: [
    {
      type: 'Tile',
      visible: true,
      source: {
        type: 'XYZ',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }
    }
  ],
  events: {
    click: (e) => console.log(e.coordinate)
  }
}

// Example configuration for using WMTS with Lantmäteriet
const wmtsConfig =
  {
    view: {
      center: [637403.351, 6924032.199],
      zoom: 10,
      projection: 'EPSG:3006'
    },
    layers: [
      {
        type: 'Tile',
        visible: true,
        projection: 'EPSG:3006',
        source: {
          type: 'WMTS',
          url: 'https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/<token>/',
          layer: 'topowebb',
          format: 'image/png',
          matrixSet: '3006',
          projection: 'EPSG:3006',
          tileGrid: {
            type: 'WMTS',
            tileSize: 256,
            extent: [-1200000, 4700000, 2600000, 8500000],
            resolutions: [4096.0, 2048.0, 1024.0, 512.0, 256.0, 128.0, 64.0, 32.0, 16.0, 8.0],
            matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          },
          version: '1.0.0',
          style: 'default',
          crossOrigin: 'anonymous'
        }
      }
    ],
    events: {
      click: (e) => console.log(e.coordinate)
    }
  }


const map = OneWayOpenLayers({
  target: 'map',
  renderer: 'canvas'
})

map.render(config)
