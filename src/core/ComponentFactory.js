import {COMPONENT_INSTANCES} from './errorMessages'
import {AppComponent} from './AppComponent'
import {$} from './DOMWrapper'

const message = COMPONENT_INSTANCES

class ComponentFactory {
  constructor(constructors) {
    this.constructors = constructors
  }

  constructComponents() {
    this.$components = this.constructors.map(Component => {
      const $el = $.create('div')
      const compObj = new Component($el)
      if (!(compObj instanceof AppComponent)) {
        delete this.$components
        throw new Error(message)
      }
      return constructComponent(compObj)
    })
    return this
  }

  notifyApp() {
    this.$components.forEach($comp => {
      console.log(AppComponent.supervisor)
      AppComponent
          .supervisor
          .components
          .push($comp)
    })
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
  const $comp = obj.getRoot()
  $comp.insertClasses(obj.classNames)
  $comp.insertHTML(obj.html)
  return $comp
}

function createComponents(...constructors) {
  return new ComponentFactory(constructors)
      .constructComponents()
      .notifyApp()
      .getTemplate()
}

export {createComponents as comp}
