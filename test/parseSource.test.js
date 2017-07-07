import ol from 'openlayers'
import OneWayOpenLayers from '../src'
import parseSource from '../src/parseSource'
import imageWmsConfig from './configs/imageWms'

const XYZ = ol.source.XYZ
const WMTS = ol.source.WMTS
const ImageWMS = ol.source.ImageWMS

describe("parseSource", function() {
  const oneWayOpenLayers = OneWayOpenLayers()
  it("XYZ", function() {
    var source = parseSource({
      type: 'XYZ',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
    expect(source).toEqual(jasmine.any(XYZ))
  })

  it("WMTS", function() {
    var source = parseSource({
      type: 'WMTS',
      url: 'https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/<token>/'
    })
    expect(source).toEqual(jasmine.any(WMTS))
  })

  it("Should parse ImageWMS source", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    var source = parseSource(imageWmsConfig.layers[0].source)
    expect(source).toEqual(jasmine.any(ImageWMS))
  })
})
