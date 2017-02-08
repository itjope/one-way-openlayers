import OLView from 'ol/view'
import changesets from 'diff-json'

const viewRenderer = (map: Object, getProps: Function): Function => (view: View): void => {
  const prevView = getProps().view
  const diffs: Array = changesets.diff(prevView, view)

  if (diffs.length) {
    map.setView(new OLView(view))
  }
}

export default viewRenderer
