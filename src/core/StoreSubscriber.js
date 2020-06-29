import utils from './utils'

const {isEqual} = utils

export class StoreSubscriber {
  constructor(store) {
    this.sub = null
    this.prevState = {}
    this.store = store
  }

  subscribeComponents(components) {
    const prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      const states = [prevState, state]
      if (!(isEqual(...states))) {
        const changes = findChange(...states)

        components.forEach(comp => {
          console.log('StoreSubscriber -> subscribeComponents -> comp ', comp )
          if (checkChanges(comp, changes)) {
            console.log('changes', comp, changes)
            comp.update()
          }
        })
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
