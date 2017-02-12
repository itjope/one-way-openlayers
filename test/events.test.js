import OneWayOpenLayers from '../src'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import xyzConfig  from './configs/xyz'

describe("Events", function() {
  it("Should register a click event handler", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const eventReferences = oneWayOpenLayers.getEvents()
    const onClick = () => undefined
    const config = assign({}, cloneDeep(xyzConfig), {
      events: {
        click: onClick
      }
    })
    oneWayOpenLayers.render(config)
    expect(eventReferences.click.listener).toBe(onClick)
  })

  it("Should remove all click event handlers", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const eventReferences = oneWayOpenLayers.getEvents()
    const onClick = () => undefined
    const onMoveEnd = () => undefined

    const configWithEvents = assign({}, cloneDeep(xyzConfig), {
      events: {
        click: onClick,
        moveend: onMoveEnd
      }
    })

    const configWithoutEvents = assign({}, cloneDeep(xyzConfig), {
      events: {}
    })

    oneWayOpenLayers.render(configWithEvents)
    expect(eventReferences.click.listener).toBe(onClick)
    expect(eventReferences.moveend.listener).toBe(onMoveEnd)

    oneWayOpenLayers.render(configWithoutEvents)
    expect(eventReferences).toEqual({})
  })

  it("Should remove one click event handlers", () => {
    const oneWayOpenLayers = OneWayOpenLayers()
    const eventReferences = oneWayOpenLayers.getEvents()
    const onClick = () => undefined
    const onMoveEnd = () => undefined

    const configWithTwoEvents = assign({}, cloneDeep(xyzConfig), {
      events: {
        click: onClick,
        moveend: onMoveEnd
      }
    })

    const configWithOneEvent = assign({}, cloneDeep(xyzConfig), {
      events: {
        click: onClick
      }
    })

    oneWayOpenLayers.render(configWithTwoEvents)
    expect(eventReferences.click.listener).toBe(onClick)
    expect(eventReferences.moveend.listener).toBe(onMoveEnd)

    oneWayOpenLayers.render(configWithOneEvent)
    expect(eventReferences.click.listener).toBe(onClick)
    expect(eventReferences.moveend).toBe(undefined)
  })
})
