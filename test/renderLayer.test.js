import ol from 'openlayers'
import OneWayOpenLayers from '../src'
import cloneDeep from 'lodash/cloneDeep'

import xyzConfig  from './configs/xyz'
import noViewConfig from './configs/noView'
import threeLayersConfig from './configs/threeLayers'

const View = ol.View

describe("Render layer", function() {
  it("Should add layers", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const oneLayerConfig = cloneDeep(xyzConfig)
    const twoLayerConfig = cloneDeep(xyzConfig)
    twoLayerConfig.layers = [...twoLayerConfig.layers, xyzConfig.layers[0]]

    oneWayOpenLayers.render(oneLayerConfig)
    oneWayOpenLayers.render(twoLayerConfig)
    expect(oneWayOpenLayers.getMap().getLayers().getArray().length).toEqual(2)
  })

  it("Should not create new layers if layer props are equal", () => {
    const oneWayOpenLayers = OneWayOpenLayers()

    oneWayOpenLayers.render(cloneDeep(xyzConfig))
    oneWayOpenLayers.render(cloneDeep(xyzConfig))
    expect(oneWayOpenLayers.getMap().getLayers().getArray().length).toEqual(1)
  })

  it("Should remove layers", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(cloneDeep(threeLayersConfig))
    expect(oneWayOpenLayers.getMap().getLayers().getArray().length).toEqual(3)

    oneWayOpenLayers.render({
      view: cloneDeep(xyzConfig.view),
      layers: []
    })
    expect(oneWayOpenLayers.getMap().getLayers().getArray().length).toEqual(0)
  })

  it("Should remove a specific layer", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const config = cloneDeep(threeLayersConfig)
    oneWayOpenLayers.render(config)
    expect(oneWayOpenLayers.getMap().getLayers().getArray().length).toEqual(3)
    const configWithRemovedLayer = {
      view: config.view,
      layers: [config.layers[0], config.layers[2]]
    }
    oneWayOpenLayers.render(configWithRemovedLayer)
    expect(oneWayOpenLayers.getMap().getLayers().getArray().length).toEqual(2)
    expect(oneWayOpenLayers.getMap().getLayers().item(0).get('name')).toEqual('Layer1')
    expect(oneWayOpenLayers.getMap().getLayers().item(1).get('name')).toEqual('Layer3')
  })

  it("Should update a layer", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const config1 = cloneDeep(threeLayersConfig)
    oneWayOpenLayers.render(config1)
    expect(oneWayOpenLayers.getMap().getLayers().item(1).get('name')).toEqual('Layer2')

    const config2 = cloneDeep(threeLayersConfig)

    config2.layers[1].name = 'Layer2Updated'
    oneWayOpenLayers.render(config2)
    expect(oneWayOpenLayers.getMap().getLayers().item(1).get('name')).toEqual('Layer2Updated')
  })

  it("Should update a layer with mutated configs", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const config = threeLayersConfig

    oneWayOpenLayers.render(config)
    expect(oneWayOpenLayers.getMap().getLayers().item(1).get('name')).toEqual('Layer2')

    config.layers[1].name = 'Layer2Updated'
    oneWayOpenLayers.render(config)

    expect(oneWayOpenLayers.getMap().getLayers().item(1).get('name')).toEqual('Layer2Updated')
  })
})
