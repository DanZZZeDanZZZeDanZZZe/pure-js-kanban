import DOMListener from './DOMListener'
import {AppCreator} from './creators'

class AppComponent extends DOMListener {
  classNames = ''
  html = ''

  constructor(options) {
    const listeners = listeners in options ?
      options.listeners :
      []
    super(options.listeners)
  }

  connect($mountPoint) {
    this.connectElement($mountPoint)
  }

  subscribe(eventName, action) {
    AppCreator.eventManager
        .subscribe(eventName, action)
  }

  notify(eventName, arg) {
    AppCreator.eventManager
        .notify(eventName, arg)
  }
}

export {AppComponent}
