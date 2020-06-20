import {Creator} from './Creator'
import {AppCreator} from './AppCreator'

export class CompCreator extends Creator {
  constructor(mountPoint, rootConstructor) {
    super(mountPoint, rootConstructor)
    this.register = AppCreator.compsRegister
    this.prevRegLen = this.register.content.length
    this.$appRoot = AppCreator.$root
  }

  connect() {
    this.register.connect(this.$appRoot, this.prevRegLen)
    return this
  }

  static update(id) {
    const instance = AppCreator
        .compsRegister
        .findComponent(id)
    const {$root, constructor} = instance
    return this.init($root, constructor)
  }

  static init(mountPoint, constructor) {
    return new this(mountPoint, constructor)
        .createTemplate()
        .replace()
        .connect()
  }
}

