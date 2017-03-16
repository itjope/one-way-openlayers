// @flow
import proj4 from 'proj4'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'

import ol from 'openlayers'
import proj4Defs from './proj4Definitions'
import renderLayers from './renderLayers'
import renderView from './renderView'
import updateEvents from './updateEvents'

import type {Options, Props, State, View, Layer, Map, MapOfEventReferences} from './types'

const OLMap = ol.Map
const OLView = ol.View
const OLProj = ol.proj

proj4.defs(proj4Defs)
OLProj.setProj4(proj4)

const OneWayOpenLayers = (options: Options) => {
  const defaults: Options = {
    target: 'map',
    renderer: 'canvas',
    props: {
      view: {
        center: [0, 0],
        zoom: 0
      },
      layers: []
    }
  }

  const state: State = {
    map: new OLMap(assign({}, defaults, options, {
      view: new OLView(defaults.props.view)
    })),
    props: defaults.props,
    eventReferences: {}
  }

  const mergeProps = (prevProps: Props, props: Props) : Props => assign({}, state.props, cloneDeep(props))

  const getMap = (): Map => state.map

  const getEvents = (): MapOfEventReferences => state.eventReferences

  const render = (props: Props) : void => {
    if (props.view) {
      renderView(state.map, state.props.view, props.view)
    }
    if (props.layers) {
      renderLayers(state.map, state.props.layers, props.layers)
    }
    if (props.events) {
      updateEvents(state.map, state.eventReferences, state.props.events, props.events)
    }

    state.props = mergeProps(state.props, props)
  }

  return {
    render,
    getMap,
    getEvents
  }
}

export default OneWayOpenLayers
