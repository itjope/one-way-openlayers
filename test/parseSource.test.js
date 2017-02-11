import OneWayOpenLayers from '../src'
import parseSource from '../src/parseSource'
import XYZ from 'ol/source/xyz'
import ImageWMS from 'ol/source/imagewms'
import imageWmsConfig from './configs/imageWms'

describe("parseSource", function() {
  const oneWayOpenLayers = OneWayOpenLayers()
  it("XYZ", function() {
    var source = parseSource({
      type: 'XYZ',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
    expect(source).toEqual(jasmine.any(XYZ))
  })

  it("Should parse ImageWMS source", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    var source = parseSource(imageWmsConfig.layers[0].source)
    expect(source).toEqual(jasmine.any(ImageWMS))
  })
})
