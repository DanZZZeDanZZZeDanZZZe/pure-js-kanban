import {Creator} from './Creator'
import {AppCreator} from './AppCreator'

export class CompCreator extends Creator {
  constructor(mountPoint, rootConstructor) {
    super(mountPoint, rootConstructor)
    this.prevCompsLen = AppCreator.compsRegister.length
  }

  connect() {
    const newComps = AppCreator.compsRegister.slice(this.prevCompsLen)
    newComps.forEach(comp => comp.connect(AppCreator.$root))
    return this
  }

  static init(mountPoint, constructor) {
    return new this(mountPoint, constructor)
        .createTemplate()
        .replace()
        .connect()
  }
}

