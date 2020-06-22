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
    return super.connect(this.$point)
  }

  static init(mountPoint, constructor, options) {
    if (this.singleton) return this.singleton
    return new this(mountPoint, constructor, options)
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
}
