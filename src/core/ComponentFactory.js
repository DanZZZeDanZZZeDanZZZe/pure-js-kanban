import {COMPONENT_INSTANCES} from './errorMessages'
import {AppComponent} from './AppComponent'
import {$} from './DOMWrapper'
import {AppCreator} from './creators'

const message = COMPONENT_INSTANCES

class ComponentFactory {
  constructor(Constructor, options, parent) {
    this.Constructor = Constructor
    this.options = options
    this.parent = parent
  }

  constructInstance() {
    const instance = new this.Constructor(this.options)
    if (!(instance instanceof AppComponent)) {
      throw new Error(message)
    }
    instance.parent = this.parent || null
    this.instance = instance
    return this
  }

  constructComponent() {
    const {classNames} = this.instance
    const html = this.instance.render()

    this.$component = $
        .create('div')
        .dataset('type', 'component')
        .insertClasses(classNames)
        .inner(html)
    return this
  }

  notifyApp() {
    AppCreator.singleton.comps.push(this.instance)
    return this
  }

  getTemplate() {
    return this.$component.outer()
  }
}

function createComponent(...args) {
  return new ComponentFactory(...args)
      .constructInstance()
      .constructComponent()
      .notifyApp()
      .getTemplate()
}

export {createComponent as build}
