// @flow
import proj4 from 'proj4'
import cloneDeep from 'lodash/cloneDeep'
import assign from 'lodash/assign'
import Map from 'ol/map'
import OLView from 'ol/view'
import OLProj from 'ol/proj'
import clondeDeep from 'lodash/cloneDeep'
import proj4Defs from './proj4Definitions'
import layersRenderer from './layerRenderer'
import viewRenderer from './viewRenderer'
import eventUpdater from './eventUpdater'

import type {Options, Props, State, View, Layer} from './types'

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
    map: new Map(assign({}, defaults, options, {
      view: new OLView(defaults.props.view)
    })),
    props: defaults.props
  }

  const getProps = (): Props => state.props

  const mergeProps = (prevProps: Props, props: Props) : Props => assign({}, state.props, cloneDeep(props))

  const renderView = viewRenderer(state.map, getProps)
  const renderLayers = layersRenderer(state.map, getProps)

  const updateEvents = eventUpdater(state.map, getProps)

  const render = (props: Props) : void => {
    const viewProps: View = props.view || state.props.view
    const layersProps: Layer[] = props.layers || state.props.layers
    const eventProps: Object = props.events || {}

    renderView(viewProps)
    renderLayers(layersProps)
    updateEvents(eventProps)
    // updateEventHandler('onClick', 'moveend', props.onClick)

    state.props = mergeProps(state.props, props)
  }

  return {
    render,
    map: state.map
  }
}

export default OneWayOpenLayers
