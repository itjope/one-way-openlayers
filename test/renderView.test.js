import OneWayOpenLayers from '../src'
import View from 'ol/view'

import noViewConfig from './configs/noView'

describe("Render view", function() {
  it("Should render defalt view if missing in props", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(noViewConfig)
    expect(oneWayOpenLayers.map.getView()).toEqual(jasmine.any(View))
    expect(oneWayOpenLayers.map.getView().getZoom()).toEqual(0)
  })
})
