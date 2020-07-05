import {isEqual} from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.sub = null
    this.prevState = {}
    this.store = store
  }

  subscribeComponents(componentTree) {
    const prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      const states = [prevState, state]
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
    })
    this.prevState = prevState
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
