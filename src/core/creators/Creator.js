import {comp} from '../ComponentFactory'
import {adjustEl} from '../utils'

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
    this.$point.inner(this.template)
    return this
  }
}
