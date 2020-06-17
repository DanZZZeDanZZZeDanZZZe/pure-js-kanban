import {AppComponent, $, utils, errorMessages} from '@core/framework'

const {COMPONENT_INSTANCES: message} = errorMessages
const {adjustEl} = utils

class ComponentFactory {
  constructor(components) {
    this.components = components
  }

  createStructure(root) {
    this.$root = adjustEl(root)

    this.components.forEach(Component => {
      const $el = $.create('div')
      const compObj = new Component($el)
      if (!(compObj instanceof AppComponent)) {
        throw new Error(message)
      }
      const $comp = constructComponent(compObj)
      this.$root.append($comp)
    })
    return this
  }

  render(mountPoint) {
    const $point = adjustEl(mountPoint)
    $point.append(this.$root)
    return this
  }
}

function constructComponent(obj) {
  const $comp = obj.getRoot()
  $comp.insertClasses(obj.classNames)
  $comp.insertHTML(obj.html)
  return $comp
}

export default ComponentFactory
