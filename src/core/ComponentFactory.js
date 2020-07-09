import {COMPONENT_INSTANCES} from './errorMessages'
import {AppComponent} from './AppComponent'
import {$} from './DOMWrapper'
import {AppCreator} from './creators'
import {compose} from './utils'

const message = COMPONENT_INSTANCES

function createInstance(Constructor, options, parent, prevState) {
  const instance = new Constructor(options, prevState || {})
  if (!(instance instanceof AppComponent)) {
    throw new Error(message)
  }
  instance.parent = parent || null
  instance.passedOptions = options
  return instance
}

function notifyApp(instance) {
  AppCreator.singleton.comps.push(instance)
  return instance
}

function getHTML(instance) {
  const {classNames, tagName} = instance
  const html = instance.render()

  return $
      .create(tagName)
      .dataset('type', 'component')
      .insertClasses(classNames)
      .inner(html)
      .outer()
}

export function build(...args) {
  return compose(getHTML, notifyApp, createInstance)(...args)
}
