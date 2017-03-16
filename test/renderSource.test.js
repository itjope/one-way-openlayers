import ol from 'openlayers'
import OneWayOpenLayers from '../src'
import xyzConfig  from './configs/xyz'
import vectorTileConfig from './configs/vectorTile'

const XYZ = ol.source.XYZ
const VectorTile = ol.source.VectorTile

describe("Render source", function() {
  it("Should render a xyz source", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(xyzConfig)
    expect(oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()).toEqual(jasmine.any(XYZ))
  })

  it("Should render a VectorTile source", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(vectorTileConfig)
    expect(oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()).toEqual(jasmine.any(VectorTile))
  })
})
