import OneWayOpenLayers from '../src'
import countries from './countries.json'

/*
{
  type: 'VectorTile',
  visible: true,
  source: {
    type: 'VectorTile',
    url: 'https://free-0.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=tXiQqN3lIgskyDErJCeY',
    styleUrl: 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json',
    format: {
      type: 'MVT'
    },
    tilePixelRatio: 8,
    tileGrid: {
      type: 'XYZ',
      tileSize: [512, 512]
    }
  }
}
*/

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
    },
    {
      type: 'Vector',
      source: {
        type: 'Vector',
        data: countries
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
map.render(config)
map.render(config)
map.render(config)
map.render(config)
map.render(config)
map.render(config)
