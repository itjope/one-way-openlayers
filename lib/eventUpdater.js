// @flow

import forEach from 'lodash/forEach'
import changesets from 'diff-json'
import type {Change, Diff, Events} from './types'

type EventReference = Object

type Map = {
  on: (string, Function) => EventReference,
  unByKey: (EventReference) => void
}

type MapOfEventReferences = {[key: string]: EventReference };

const eventRefsStore: MapOfEventReferences = {}

const registerEvent = (map: Map, eventName: string, eventFunc: Function): void => {
  eventRefsStore[eventName] = map.on(eventName, eventFunc)
}

const unregisterEvent = (map: Map, eventName: string): void => {
  const ref: EventReference = eventRefsStore[eventName]
  map.unByKey(ref)
  eventRefsStore[eventName] = {}
  delete eventRefsStore[eventName]
}

const unregisterAllEvents = (map: Map) => {
  forEach(eventRefsStore, (eventRef: EventReference) => map.unByKey(eventRef))
}

const typeFilter = (type: string) => (obj: Object) => obj.type === type

const eventUpdater = (map: Map, getProps: Function) => (eventProps: Events): void => {

  const addEvents = (change: Change): void => {
    if (change.key === '$root') {
      unregisterAllEvents(map)
      forEach(change.value, (func, key) => {
        registerEvent(map, key, eventProps[key])
      })
    } else {
      registerEvent(map, change.key, eventProps[change.key])
    }
  }

  const removeEvents = (change: Change): void => {
    if (change.key === '$root') {
      unregisterAllEvents(map)
    } else {
      unregisterEvent(map, change.key)
    }
  }

  const applyDiff = (prevEventProps: Events, nextEventProps: Events): void => {
    const changes: Change[] = changesets.diff(prevEventProps, nextEventProps)

    changes
      .filter(typeFilter('remove'))
      .forEach(removeEvents)

    changes
      .filter(typeFilter('add'))
      .forEach(addEvents)
  }

  applyDiff(getProps().events, eventProps)
}

export default eventUpdater
