import DOMListener from './DOMListener'
import {AppCreator, CompCreator} from './creators'

class AppComponent extends DOMListener {
  constructor(options) {
    super(options?.events)
    this.classNames = options?.classNames || ''
    this.watch = options?.watch || ''

    this.unsubs = []
    this.app = AppCreator.singleton
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
    const unsub = this.app.eventManager
        .subscribe(eventName, action)
    this.unsubs.push(unsub)
  }

  notify(eventName, arg) {
    this.app.eventManager
        .notify(eventName, arg)
  }

  $subscribe(fn) {
    this.app.store.subscribe(fn)
  }

  $dispatch(action) {
    this.app.store.dispatch(action)
  }

  update() {
    const reg = AppCreator.compsRegister
    const instance = reg.findComponent(this.id)
    reg.deleteComponent(this.id)
    const {$root, constructor, options, id} = instance
    return CompCreator.init($root, constructor, options, id)
  }
}

export {AppComponent}
