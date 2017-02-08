export default {
  view: {
    center: [0, 0],
    zoom: 0
  },
  layers: [
    {
      "name": "Karta",
      "visible": true,
      "source": {
        "params": {
          "FORMAT": "image/jpeg",
          "LAYERS": "common:Karta",
          "VERSION": "1.1.1",
          "tiled": true
        },
        "tileGrid": {
          "origin": [
            218128,
            6126002
          ],
          "resolutions": [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4],
          "type": "TileGrid"
        },
        "type": "TileWMS"
      },
      "type": "Tile"
    }
  ]
}
