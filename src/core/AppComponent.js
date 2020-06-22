import DOMListener from './DOMListener'
import {AppCreator} from './creators'

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
}

export {AppComponent}
