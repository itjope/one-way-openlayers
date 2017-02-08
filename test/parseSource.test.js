import OneWayOL3 from '../lib'
import parseSource from '../lib/parseSource'
import XYZ from 'ol/source/xyz'
import ImageWMS from 'ol/source/imagewms'
import imageWmsConfig from './configs/imageWms'

const map = OneWayOL3()

describe("parseSource", function() {
  it("XYZ", function() {
    var source = parseSource({
      type: 'XYZ',
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
    expect(source).toEqual(jasmine.any(XYZ))
  })

  it("Should parse ImageWMS source", function() {
    var source = parseSource(imageWmsConfig.layers[0].source)
    expect(source).toEqual(jasmine.any(ImageWMS))
  })
})
