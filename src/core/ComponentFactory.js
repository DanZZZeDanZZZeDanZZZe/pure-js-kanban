import {COMPONENT_INSTANCES} from './errorMessages'
import {AppComponent} from './AppComponent'
import {$} from './DOMWrapper'
import {AppCreator} from './creators'

const message = COMPONENT_INSTANCES

class ComponentFactory {
  constructor(Constructor, options) {
    this.Constructor = Constructor
    this.options = options
  }

  constructInstance() {
    const instance = new this.Constructor(this.options)
    if (!(instance instanceof AppComponent)) {
      throw new Error(message)
    }
    instance.id = `${AppCreator.singleton.сompCounter++ || 0}`
    instance.options = this.options
    this.instance = instance
    return this
  }

  constructComponent() {
    const {id, classNames} = this.instance
    const html = this.instance.render()

    this.$component = $
        .create('div')
        .dataset('id', id)
        .insertClasses(classNames)
        .inner(html)
    return this
  }

  notifyApp() {
    AppCreator.compsRegister.add(this.instance)
    return this
  }

  getTemplate() {
    return this.$component.outer()
  }
}

function createComponent(constructor, options) {
  return new ComponentFactory(constructor, options)
      .constructInstance()
      .constructComponent()
      .notifyApp()
      .getTemplate()
}

export {createComponent as build}
