export default {
  view: {
    center: [0, 0],
    zoom: 0
  },
  layers: [
    {
      name: 'Layer1',
      type: 'Tile',
      visible: true,
      source: {
        type: 'XYZ',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }
    },
    {
      name: 'Layer2',
      type: 'Tile',
      visible: true,
      source: {
        type: 'XYZ',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }
    },
    {
      name: 'Layer3',
      type: 'Tile',
      visible: true,
      source: {
        type: 'XYZ',
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }
    }
  ]
}
