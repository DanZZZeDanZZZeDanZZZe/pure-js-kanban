import DOMListener from './DOMListener'
import {AppCreator, CompCreator} from './creators'

class AppComponent extends DOMListener {
  classNames = ''

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

  render() {
    return ''
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }

  subscribe(eventName, action) {
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
    const {$root, constructor, options} = instance
    return CompCreator.init($root, constructor, options)
  }
}

export {AppComponent}
