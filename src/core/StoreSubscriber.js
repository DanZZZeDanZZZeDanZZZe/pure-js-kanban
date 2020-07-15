import {isEqual, copyFields, storage} from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.sub = null
    this.store = store
  }

  subscribeComponents(componentTree) {
    let prevState = {}

    this.sub = this.store.subscribe(newState => {
      const states = [prevState, newState]
      if (!(isEqual(...states))) {
        const changes = findChange(...states)
        const updateComponents = branch => {
          const {component, children} = branch
          if (checkChanges(component, changes)) {
            component.$update()
          }
          children.forEach(c => updateComponents(c))
        }
        updateComponents(componentTree.getState())
      }
      storage('state', newState)
      prevState = copyFields(newState)
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}

function checkChanges(comp, changes) {
  return !!changes
      .filter(ch => comp.watch.includes(ch))
      .length
}

function findChange(prevState, state) {
  return Object.keys(state).filter(key => {
    return !isEqual(state[key], prevState[key])
  })
}
