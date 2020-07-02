import DOMListener from './DOMListener'
import {AppCreator} from './creators'
import {build} from './ComponentFactory'


class AppComponent extends DOMListener {
  constructor(options) {
    super(options?.events)
    this.options = options
    this.classNames = options?.classNames || ''
    this.watch = options?.watch || []
    this.unsubs = []

    this.$build = this.$build.bind(this)

    this.app = AppCreator.singleton
  }

  connect($mountPoint) {
    this.connectElement($mountPoint)
  }

  init($element) {
    this.initDOMListeners($element)
  }

  prepare() {}

  render() {
    return ''
  }

  get $state() {
    return this.app.store.getState()
  }

  $destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }

  $listen(eventName, action) {
    const unsub = this.app.eventManager
        .subscribe(eventName, action)
    this.unsubs.push(unsub)
  }

  $notify(eventName, arg) {
    this.app.eventManager
        .notify(eventName, arg)
  }

  $subscribe(fn) {
    this.app.store.subscribe(fn)
  }

  $dispatch(action) {
    this.app.store.dispatch(action)
  }

  $build(constructor, options) {
    return build(constructor, options, this)
  }

  update() {
    let {comps, tree} = this.app
    const template = build(this.constructor, this.options, this.parent)
    this.$root.outer(template)
    tree.updateBranch(comps, this)
    comps = []
  }
}

export {AppComponent}
