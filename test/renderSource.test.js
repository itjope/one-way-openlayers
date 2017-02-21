import OneWayOpenLayers from '../src'
import XYZ from 'ol/source/xyz'
import VectorTile from 'ol/source/vectortile'

import xyzConfig  from './configs/xyz'
import vectorTileConfig from './configs/vectorTile'

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
