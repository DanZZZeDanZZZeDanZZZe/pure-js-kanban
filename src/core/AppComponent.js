import DOMListener from './DOMListener'
import {AppCreator} from './creators'
import {build} from './ComponentFactory'
import {$} from '.'


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

  $setState(state, $prevState) {
    this.$state = $prevState ?
        {...$prevState} :
        {}
    Object.keys(state).forEach(key => {
      const value = state[key]
      if (value !== undefined) {
        this.$state[key] = value
      }
    })
  }

  get $appState() {
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
    const way = makeAWay(this.$root)
    const template = build(
        this.constructor,
        this.options,
        this.parent,
        this.$state
    )
    this.$root.outer(template)

    const $updatePoint = way()

    this.app.tree.updateBranch($updatePoint, this.app.comps, this)
    this.app.comps = []
  }

  $calledOut(value, event) {
    return !!$(event.target).closestData('type', value)
  }
}

function makeAWay($el) {
  let ancestor = $el.previous
  if (ancestor === null) {
    ancestor = $el.parent
    return () => ancestor.first
  }
  return () => ancestor.next
}

export {AppComponent}
