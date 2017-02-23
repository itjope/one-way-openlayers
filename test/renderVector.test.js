import assign from 'lodash/assign'
import OneWayOpenLayers from '../src'
import VectorSource from 'ol/source/vector'
import vectorConfig  from './configs/vectorData'
import vectorDataWithTwoFeaturesConfig  from './configs/vectorDataWithTwoFeatures'

describe("Render vector", function() {
  it("Should render a vector source", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(vectorConfig)
    expect(oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()).toEqual(jasmine.any(VectorSource))
  })

  it("Should render a feature", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(vectorConfig)
    const source = oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()
    const features = source.getFeatures()
    expect(features.length).toEqual(1)
  })

  it("Should update features", function() {
    const oneWayOpenLayers = OneWayOpenLayers()
    oneWayOpenLayers.render(vectorConfig)
    const source1 = oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()
    const features1 = source1.getFeatures()
    expect(features1.length).toEqual(1)

    oneWayOpenLayers.render(vectorDataWithTwoFeaturesConfig)
    const source2 = oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()
    const features2 = source2.getFeatures()
    expect(features2.length).toEqual(2)
  })

  it("Should render features with dataProjection", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const config = assign({}, vectorConfig, {
      crs: {
        type: 'EPSG',
        properties: {
           code: 4326
        }
      }
    })
    oneWayOpenLayers.render(vectorConfig)
    const source = oneWayOpenLayers.getMap().getLayers().getArray()[0].getSource()
    const features = source.getFeatures()
    expect(features.length).toEqual(1)
  })
})
