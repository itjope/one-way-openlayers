// @flow
import ol from 'openlayers'

import forEach from 'lodash/forEach'
import changesets from 'diff-json'
import type {Change, Diff, Events, Map, EventReference, MapOfEventReferences} from './types'
const OLObservable = ol.Observable

const registerEvent = (map: Map, eventRefsStore: MapOfEventReferences, eventName: string, eventFunc: Function): void => {
  eventRefsStore[eventName] = map.on(eventName, eventFunc)
}

const unregisterEvent = (eventRefsStore: MapOfEventReferences, eventName: string): void => {
  const ref: EventReference = eventRefsStore[eventName]
  OLObservable.unByKey(ref)
  delete eventRefsStore[eventName]
}

const unregisterAllEvents = (eventRefsStore: MapOfEventReferences) => {
  forEach(eventRefsStore, (eventRef: EventReference, key: string) => {
    OLObservable.unByKey(eventRef)
    delete eventRefsStore[key]
  })
}

const typeFilter = (type: string) => (obj: Object) => obj.type === type

const addEvents = (map: Map, eventRefsStore: MapOfEventReferences, nextEvents: Events) => (change: Change): void => {
  if (change.key === '$root') {
    unregisterAllEvents(eventRefsStore)
    forEach(change.value, (func, key) => {
      registerEvent(map, eventRefsStore, key, nextEvents[key])
    })
  } else {
    registerEvent(map, eventRefsStore, change.key, nextEvents[change.key])
  }
}

const removeEvents = (eventRefsStore: MapOfEventReferences) => (change: Change): void => {
  if (change.key === '$root') {
    unregisterAllEvents(eventRefsStore)
  } else {
    unregisterEvent(eventRefsStore, change.key)
  }
}

const updateEvents = (map: Map, eventRefsStore: MapOfEventReferences, prevEvents: ?Events, nextEvents: Events): void => {
  const changes: Change[] = changesets.diff(prevEvents, nextEvents)
  changes
    .filter(typeFilter('remove'))
    .forEach(removeEvents(eventRefsStore))

  changes
    .filter(typeFilter('add'))
    .forEach(addEvents(map, eventRefsStore, nextEvents))

}

export default updateEvents
