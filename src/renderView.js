import ol from 'openlayers'
import changesets from 'diff-json'
import type {Map, View} from './types'

const OLView = ol.View

const renderView = (map: Map, prevView: View, nextView: View): void => {
  const diffs: Array = changesets.diff(prevView, nextView)
  if (diffs.length) {
    map.setView(new OLView(nextView))
  }
}

export default renderView
