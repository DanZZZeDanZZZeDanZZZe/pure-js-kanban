import DOMListener from './DOMListener'
import {AppCreator, CompCreator} from './creators'

class AppComponent extends DOMListener {
  constructor(options) {
    super(options?.events)
    this.classNames = options?.classNames || ''
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
    const reg = AppCreator.compsRegister
    const instance = reg.findComponent(this.id)
    reg.deleteComponent(this.id)
    const {$root, constructor, options, id} = instance
    return CompCreator.init($root, constructor, options, id)
  }
}

export {AppComponent}
