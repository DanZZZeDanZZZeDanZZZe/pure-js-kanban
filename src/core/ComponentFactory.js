import {COMPONENT_INSTANCES} from './errorMessages'
import {AppComponent} from './AppComponent'
import {$} from './DOMWrapper'
import {AppFactory} from './AppFactory'

const message = COMPONENT_INSTANCES

class ComponentFactory {
  constructor(constructors) {
    this.constructors = constructors
  }

  constructInstances() {
    this.componentInstances = this.constructors.map(Constructor => {
      const instance = new Constructor(this.id)
      if (!(instance instanceof AppComponent)) {
        delete this.$components
        throw new Error(message)
      }

      instance.id = AppFactory.singleton.сompCounter++ || 0
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
      AppFactory
          .singleton
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
      .dataset('id', `${obj.id}`)
      .insertClasses(obj.classNames)
      .html(obj.html)
}

function createComponents(...constructors) {
  return new ComponentFactory(constructors, )
      .constructInstances()
      .constructComponents()
      .notifyApp()
      .getTemplate()
}

export {createComponents as comp}
