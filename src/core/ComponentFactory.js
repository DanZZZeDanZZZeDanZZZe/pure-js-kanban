import {COMPONENT_INSTANCES} from './errorMessages'
import {AppComponent} from './AppComponent'
import {$} from './DOMWrapper'

const message = COMPONENT_INSTANCES

class ComponentFactory {
  constructor(constructors, parentId) {
    this.constructors = constructors
    this.id = parentId
  }

  constructInstances() {
    this.componentInstances = this.constructors.map(Constructor => {
      const instance = new Constructor(this.id)
      if (!(instance instanceof AppComponent)) {
        delete this.$components
        throw new Error(message)
      }
      return instance
    })
    return this
  }

  constructComponents() {
    this.$components = this.componentInstances
        .map(constructComponent)
    return this
  }

  notifyApp() {
    const register = $comp => {
      AppComponent
          .supervisor
          .components
          .push($comp)
    }
    this.componentInstances.forEach(register)
    return this
  }

  getTemplate() {
    const html = $comp => $comp.html()
    return this.$components
        .map(html)
        .join('')
  }
}

function constructComponent(obj) {
  return $
      .create('div')
      .insertClasses(obj.classNames)
      .html(obj.html)
}

function createComponents(...constructors) {
  return new ComponentFactory(constructors, 1)
      .constructInstances()
      .constructComponents()
      .notifyApp()
      .getTemplate()
}

export {createComponents as comp}
