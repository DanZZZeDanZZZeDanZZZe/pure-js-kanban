export function createStore(rootReducer, initalState) {
  let state = rootReducer({...initalState}, {type: '__INIT__'})
  let listeners = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(l => l(state))
    },

    subscribe(listener) {
      listeners.push(listener)

      return function unsubscribe() {
        listeners = listeners.filter(l => l !== listener)
      }
    },

    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}
