import {ComponentRegister} from '../registers'
import {createEventManager} from '../eventManager'
import {Creator} from './Creator'

export class AppCreator extends Creator {
  static singleton = null

  constructor(mountPoint, rootConstructor) {
    super(mountPoint, rootConstructor)
    this.eventManager = createEventManager()
    this.compsRegister = new ComponentRegister([])
    AppCreator.singleton = this
  }

  createTemplate() {
    this.сompCounter = null
    return super.createTemplate()
  }

  connect() {
    this.compsRegister.connect(this.$point)
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
