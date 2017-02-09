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

const map = OneWayOpenLayers({
  target: 'map'
})
map.render(config)
