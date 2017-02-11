// @flow

import forEach from 'lodash/forEach'
import changesets from 'diff-json'
import type {Change, Diff, Events, Map} from './types'
import OLObservable from 'ol/observable'

type EventReference = Object

type MapOfEventReferences = {[key: string]: EventReference };

const eventRefsStore: MapOfEventReferences = {}

const registerEvent = (map: Map, eventName: string, eventFunc: Function): void => {
  eventRefsStore[eventName] = map.on(eventName, eventFunc)
}

const unregisterEvent = (eventName: string): void => {
  const ref: EventReference = eventRefsStore[eventName]
  OLObservable.unByKey(ref)
  eventRefsStore[eventName] = {}
  delete eventRefsStore[eventName]
}

const unregisterAllEvents = () => {
  forEach(eventRefsStore, (eventRef: EventReference) => OLObservable.unByKey(eventRef))
}

const typeFilter = (type: string) => (obj: Object) => obj.type === type

const addEvents = (map: Map, nextEvents: Events) => (change: Change): void => {
  if (change.key === '$root') {
    unregisterAllEvents()
    forEach(change.value, (func, key) => {
      registerEvent(map, key, nextEvents[key])
    })
  } else {
    registerEvent(map, change.key, nextEvents[change.key])
  }
}

const removeEvents = (change: Change): void => {
  if (change.key === '$root') {
    unregisterAllEvents()
  } else {
    unregisterEvent(change.key)
  }
}

const updateEvents = (map: Map, prevEvents: ?Events, nextEvents: Events): void => {
  const changes: Change[] = changesets.diff(prevEvents, nextEvents)

  changes
    .filter(typeFilter('remove'))
    .forEach(removeEvents)

  changes
    .filter(typeFilter('add'))
    .forEach(addEvents(map, nextEvents))

}

export default updateEvents
