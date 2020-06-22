import DOMListener from './DOMListener'
import {AppCreator, CompCreator} from './creators'

class AppComponent extends DOMListener {
  classNames = ''
  html = ''

  constructor(options) {
    super(options?.events)
    this.unsubs = []
  }

  connect($mountPoint) {
    this.connectElement($mountPoint)
  }

  init() {
    this.initDOMListeners()
  }

  prepare() {}

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }

  subscribe(eventName, action) {
    console.log(AppCreator)
    const unsub = AppCreator.singleton.eventManager
        .subscribe(eventName, action)
    this.unsubs.push(unsub)
  }

  notify(eventName, arg) {
    AppCreator.singleton.eventManager
        .notify(eventName, arg)
  }

  update() {
    const instance = AppCreator
        .compsRegister
        .findComponent(this.id)
    console.log(instance)
    const {$root, constructor} = instance
    return CompCreator.init($root, constructor)
  }
}

export {AppComponent}
