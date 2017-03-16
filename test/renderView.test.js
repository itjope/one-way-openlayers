import OneWayOpenLayers from '../src'
import ol from 'openlayers'

import noViewConfig from './configs/noView'

const View = ol.View

describe("Render view", function() {
  it("Should render defalt view if missing in props", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(noViewConfig)
    expect(oneWayOpenLayers.getMap().getView()).toEqual(jasmine.any(View))
    expect(oneWayOpenLayers.getMap().getView().getZoom()).toEqual(0)
  })
})
