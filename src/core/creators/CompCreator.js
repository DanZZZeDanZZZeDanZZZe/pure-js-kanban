import {Creator} from './Creator'
import {AppCreator} from './AppCreator'

export class CompCreator extends Creator {
  constructor(mountPoint, rootConstructor) {
    super(mountPoint, rootConstructor)
    this.compsRegister = AppCreator.compsRegister
    this.prevRegLen = this.compsRegister.content.length
    this.$appRoot = AppCreator.$root
  }

  connect() {
    return super.connect(this.$appRoot, this.prevRegLen)
  }

  hangEvents() {
    return super.hangEvents(this.prevRegLen)
  }

  prepare() {
    return super.prepare(this.prevRegLen)
  }

  static init(mountPoint, constructor) {
    return new this(mountPoint, constructor)
        .createTemplate()
        .replace()
        .connect()
        .hangEvents()
        .prepare()
  }
}

