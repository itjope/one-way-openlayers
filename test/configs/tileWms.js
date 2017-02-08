export default {
  view: {
    center: [0, 0],
    zoom: 0
  },
  layers: [
    {
      "name": "TileWMS",
      "visible": true,
      "source": {
        url: 'https://ahocevar.com/geoserver/wms',
        params: {'LAYERS': 'topp:states', 'TILED': true},
        serverType: 'geoserver',
        "type": "TileWMS"
      },
      "type": "Tile"
    }
  ]
}
