import OneWayOL3 from '../src'
import View from 'ol/view'
import cloneDeep from 'lodash/cloneDeep'

import xyzConfig  from './configs/xyz'
import noViewConfig from './configs/noView'
import threeLayersConfig from './configs/threeLayers'

describe("Render layer", function() {
  it("Should add layers", () => {
    const oneWayOL3 = OneWayOL3()
    const oneLayerConfig = cloneDeep(xyzConfig)
    const twoLayerConfig = cloneDeep(xyzConfig)
    twoLayerConfig.layers = [...twoLayerConfig.layers, xyzConfig.layers[0]]

    oneWayOL3.render(oneLayerConfig)
    oneWayOL3.render(twoLayerConfig)
    expect(oneWayOL3.map.getLayers().getArray().length).toEqual(2)
  })

  it("Should not create new layers if layer props are equal", () => {
    const oneWayOL3 = OneWayOL3()

    oneWayOL3.render(cloneDeep(xyzConfig))
    oneWayOL3.render(cloneDeep(xyzConfig))
    expect(oneWayOL3.map.getLayers().getArray().length).toEqual(1)
  })

  it("Should remove layers", () => {
    const oneWayOL3 = OneWayOL3()
    oneWayOL3.render(cloneDeep(threeLayersConfig))
    expect(oneWayOL3.map.getLayers().getArray().length).toEqual(3)

    oneWayOL3.render({
      view: cloneDeep(xyzConfig.view),
      layers: []
    })
    expect(oneWayOL3.map.getLayers().getArray().length).toEqual(0)
  })

  it("Should remove a specific layer", () => {
    const oneWayOL3 = OneWayOL3()
    const config = cloneDeep(threeLayersConfig)
    oneWayOL3.render(config)
    expect(oneWayOL3.map.getLayers().getArray().length).toEqual(3)
    const configWithRemovedLayer = {
      view: config.view,
      layers: [config.layers[0], config.layers[2]]
    }
    oneWayOL3.render(configWithRemovedLayer)
    expect(oneWayOL3.map.getLayers().getArray().length).toEqual(2)
    expect(oneWayOL3.map.getLayers().item(0).get('name')).toEqual('Layer1')
    expect(oneWayOL3.map.getLayers().item(1).get('name')).toEqual('Layer3')
  })

  it("Should update a layer", () => {
    const oneWayOL3 = OneWayOL3()
    const config1 = cloneDeep(threeLayersConfig)
    oneWayOL3.render(config1)
    expect(oneWayOL3.map.getLayers().item(1).get('name')).toEqual('Layer2')

    const config2 = cloneDeep(threeLayersConfig)

    config2.layers[1].name = 'Layer2Updated'
    oneWayOL3.render(config2)
    expect(oneWayOL3.map.getLayers().item(1).get('name')).toEqual('Layer2Updated')
  })

  it("Should update a layer with mutated configs", () => {
    const oneWayOL3 = OneWayOL3()
    const config = threeLayersConfig

    oneWayOL3.render(config)
    expect(oneWayOL3.map.getLayers().item(1).get('name')).toEqual('Layer2')

    config.layers[1].name = 'Layer2Updated'
    oneWayOL3.render(config)

    expect(oneWayOL3.map.getLayers().item(1).get('name')).toEqual('Layer2Updated')
  })
})
