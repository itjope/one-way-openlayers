export default {
  layers: [{
    type: 'Image',
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: {
      type: 'ImageWMS',
      url: 'https://ahocevar.com/geoserver/wms',
      params: {'LAYERS': 'topp:states'},
      serverType: 'geoserver'
    }
  }]
}
