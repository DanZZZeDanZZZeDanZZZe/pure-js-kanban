import {comp} from './ComponentFactory'
import {adjustEl} from './utils'
import {AppComponent} from './framework'

export class AppFactory {
  static singleton = null

  constructor(rootConstructor) {
    this.root = rootConstructor
    this.singleton = this
    this.components = []
  }

  trackСomponents(CompClass) {
    CompClass.supervisor = this
    return this
  }

  createTemplate() {
    this.template = comp(this.root)
    return this
  }

  render(mountPoint) {
    const $point = adjustEl(mountPoint)
    $point.html(this.template)
    return this
  }
}

export function createApp(mountPoint, constructor) {
  if (AppFactory.singleton) return AppFactory.singleton

  return new AppFactory(constructor)
      .trackСomponents(AppComponent)
      .createTemplate()
      .render(mountPoint)
}
