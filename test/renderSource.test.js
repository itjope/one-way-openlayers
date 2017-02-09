import OneWayOL3 from '../src'
import parseSource from '../src/parseSource'
import XYZ from 'ol/source/xyz'

import xyzConfig  from './configs/xyz'

describe("Render source", function() {
  it("Should render a xyz source", function() {
    const oneWayOL3 = OneWayOL3()
    oneWayOL3.render(xyzConfig)
    expect(oneWayOL3.map.getLayers().getArray()[0].getSource()).toEqual(jasmine.any(XYZ))
  })
})
