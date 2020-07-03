import {StoreSubscriber} from '../StoreSubscriber'
import {createEventManager} from '../creators'
import {CompnentTree} from '../ComponentTree'
import {build} from '../ComponentFactory'
import {createStore} from './store'
import {adjustEl} from '../utils'

export class AppCreator {
  static singleton = null

  constructor(mountPoint, rootConstructor, rootReducer, initalState) {
    this.$point = adjustEl(mountPoint)
    this.root = rootConstructor

    this.eventManager = createEventManager()
    this.comps = []

    if (rootReducer) {
      this.store = createStore(rootReducer, initalState)
    } else {
      throw new Error('No reducer set')
    }

    AppCreator.singleton = this
  }

  createTemplate() {
    this.template = build(this.root)
    return this
  }

  addTo(position) {
    this.$point.html(this.template, position)
    return this
  }

  connect() {
    this.tree = new CompnentTree(this.comps)
        .connectToHTML(this.$point)
    console.log('AppCreator -> connect -> this.tree ', this.tree )
    this.comps = []
    return this
  }

  subscribe() {
    this.storeSubscriber = new StoreSubscriber(this.store)
    this.storeSubscriber.subscribeComponents(this.tree)
    return this
  }

  static init(...args) {
    if (this.singleton) return this.singleton
    return new this(...args)
        .createTemplate()
        .addTo()
        .connect()
        .subscribe()
  }

  static get compsRegister() {
    return this.singleton.compsRegister
  }

  static get $root() {
    return this.singleton.$point
  }

  static get state() {
    return this.singleton.store.getState()
  }
}
