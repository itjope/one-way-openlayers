export default {
  view: {
    center: [0, 0],
    zoom: 0
  },
  layers: [
    {
      "type": "VectorTile",
      "renderMode": "image",
      "source": {
        "format": {
          "type": "MVT"
        },
        "type": "VectorTile",
        "projection": "EPSG:3006",
        "tileGrid": {
          "type": "TileGrid",
          "origin": [218128, 6126002],
          "resolutions": [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5]
        }
      }
    }
  ]
}
