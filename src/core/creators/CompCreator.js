import {Creator} from './Creator'
import {AppCreator} from './AppCreator'

export class CompCreator extends Creator {
  constructor(mountPoint, rootConstructor, options, id) {
    super(mountPoint, rootConstructor, options)
    this.compsRegister = AppCreator.compsRegister
    this.prevRegLen = this.compsRegister.content.length
    this.$appRoot = AppCreator.$root
    this.id = id
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

  static init(mountPoint, constructor, options, id) {
    return new this(mountPoint, constructor, options, id)
        .createTemplate()
        .replace()
        .connect()
        .hangEvents()
        .prepare()
  }
}

