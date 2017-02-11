import OneWayOpenLayers from '../src'
import parseSource from '../src/parseSource'
import XYZ from 'ol/source/xyz'

import xyzConfig  from './configs/xyz'

describe("Render source", function() {
  it("Should render a xyz source", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(xyzConfig)
    expect(oneWayOpenLayers.map.getLayers().getArray()[0].getSource()).toEqual(jasmine.any(XYZ))
  })
})
