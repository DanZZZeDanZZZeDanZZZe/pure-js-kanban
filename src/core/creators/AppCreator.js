import {StoreSubscriber} from '../StoreSubscriber'
import {ComponentRegister} from '../registers'
import {createEventManager} from '../creators'
import {Creator} from './Creator'
import {createStore} from './store'


export class AppCreator extends Creator {
  static singleton = null

  constructor(mountPoint, rootConstructor, rootReducer, initalState) {
    super(mountPoint, rootConstructor)
    this.compsRegister = new ComponentRegister([])
    this.eventManager = createEventManager()

    if (rootReducer) {
      this.store = createStore(rootReducer, initalState)
    } else {
      throw new Error('No reducer set')
    }

    this.storeSubscriber = new StoreSubscriber(this.store)
    this.storeSubscriber.subscribeComponents(this.compsRegister.comps)

    AppCreator.singleton = this
  }

  createTemplate() {
    this.сompCounter = null
    return super.createTemplate()
  }

  connect() {
    return super.connect(this.$point)
  }

  static init(...args) {
    if (this.singleton) return this.singleton
    return new this(...args)
        .createTemplate()
        .addTo()
        .connect()
        .hangEvents()
        .prepare()
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
