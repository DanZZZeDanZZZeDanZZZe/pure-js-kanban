function createEventManager() {
  const events = new Map()

  function subscribe(eventType, listener) {
    events.has(eventType) ?
    events.get(eventType).push(listener) :
    events.set(eventType, [listener])

    return function unsubscribe() {
      const listeners = events
          .get(eventType)
          .filter(el => el !== listener)

      events.set(eventType, listeners)
    }
  }

  function notify(eventType, data) {
    events
        .get(eventType)
        .forEach(listener => listener(data))
  }

  return {subscribe, notify}
}

export {createEventManager}
