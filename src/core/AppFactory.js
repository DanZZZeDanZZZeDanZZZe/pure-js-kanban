import {comp} from './ComponentFactory'
import {adjustEl} from './utils'

import {createEventManager} from './eventManager'

export class AppFactory {
  static singleton = null

  constructor(rootConstructor) {
    this.root = rootConstructor
    this.eventManager = createEventManager()
    this.components = []
    AppFactory.singleton = this
  }

  createTemplate() {
    this.сompCounter = null
    this.template = comp(this.root)
    delete this.сompCounter
    return this
  }

  render(mountPoint) {
    const $point = adjustEl(mountPoint)
    $point.html(this.template)
    this.components.forEach(comp => comp.connect($point))
    console.log(this)
    return this
  }
}

export function createApp(mountPoint, constructor) {
  if (AppFactory.singleton) return AppFactory.singleton

  return new AppFactory(constructor)
      .createTemplate()
      .render(mountPoint)
}
