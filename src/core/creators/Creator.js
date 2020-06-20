import {comp} from '../ComponentFactory'
import utils from '../utils'

const {adjustEl} = utils

export class Creator {
  constructor(mountPoint, rootConstructor) {
    this.root = rootConstructor
    this.$point = adjustEl(mountPoint)
  }

  createTemplate() {
    this.template = comp(this.root)
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
