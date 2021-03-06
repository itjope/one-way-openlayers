import ol from 'openlayers'

import OneWayOpenLayers from '../src'
const OLProj = ol.proj

describe("Projections", function() {
  it("Should have proj4 custom projections", () => {
    expect(OLProj.get('EPSG:3006')).not.toBe(null)
    expect(OLProj.get('EPSG:3008')).not.toBe(null)
    expect(OLProj.get('EPSG:3021')).not.toBe(null)
    expect(OLProj.get('EPSG:2400')).not.toBe(null)
  })
})
