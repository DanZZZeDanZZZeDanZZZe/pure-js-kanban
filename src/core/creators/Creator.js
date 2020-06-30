import {build} from '../ComponentFactory'
import utils from '../utils'

const {adjustEl} = utils

export class Creator {
  constructor(mountPoint, rootConstructor, options) {
    this.root = rootConstructor
    this.options = options
    this.$point = adjustEl(mountPoint)
  }

  createTemplate() {
    this.template = build(this.root, this.options, this.id)
    return this
  }

  connect(root, start, end) {
    this.compsRegister.connect(root, start, end)
    return this
  }

  hangEvents(start, end) {
    this.compsRegister.hangEvents(start, end)
    return this
  }

  prepare(start, end) {
    this.compsRegister.prepare(start, end)
    return this
  }

  addTo(position) {
    this.$point.html(this.template, position)
    return this
  }

  replace() {
    this.$point.outer(this.template)
    return this
  }
}
