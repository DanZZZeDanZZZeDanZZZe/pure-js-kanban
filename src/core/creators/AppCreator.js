import {createEventManager} from '../eventManager'
import {Creator} from './Creator'

export class AppCreator extends Creator {
  static singleton = null

  constructor(mountPoint, rootConstructor) {
    super(mountPoint, rootConstructor)
    this.eventManager = createEventManager()
    this.compsRegister = []
    AppCreator.singleton = this
  }

  createTemplate() {
    this.сompCounter = null
    return super.createTemplate()
  }

  connect() {
    const connect = comp => {
      return comp.connect(this.$point)
    }
    this.compsRegister.forEach(connect)
  }

  static init(mountPoint, constructor) {
    if (this.singleton) return this.singleton
    return new this(mountPoint, constructor)
        .createTemplate()
        .addTo()
        .connect()
  }

  static get compsRegister() {
    return this.singleton.compsRegister
  }

  static get $root() {
    return this.singleton.$point
  }
}
