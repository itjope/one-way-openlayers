import OneWayOL3 from '../lib'
import View from 'ol/view'

import noViewConfig from './configs/noView'

describe("Render view", function() {
  it("Should render defalt view if missing in props", () => {
    const oneWayOL3 = OneWayOL3()
    oneWayOL3.render(noViewConfig)
    expect(oneWayOL3.map.getView()).toEqual(jasmine.any(View))
    expect(oneWayOL3.map.getView().getZoom()).toEqual(0)
  })
})
