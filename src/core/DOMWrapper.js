const CONSTRUCTOR_ERROR =
    'The parameter must be either a string or an HTML element'
const CLASSES_ERROR =
    'The parameter must be either a string or an instance of Array'


class DOMWrapper {
  constructor(el) {
    if (typeof el === 'string') {
      this.el = document.querySelector(el.trim())
      return this
    }
    if (el instanceof HTMLElement) {
      this.el = el
      return this
    }
    throw new Error(CONSTRUCTOR_ERROR)
  }

  insertHTML(text, pos = 'afterbegin') {
    this.el.insertAdjacentHTML(pos, text)
    return this
  }

  insertClasses(classNames) {
    if (typeof classNames === 'string') {
      classNames = classNames.trim().split(' ')
    }
    if (classNames instanceof Array) {
      this.el.classList.add(...classNames)
      return this
    }
    throw new Error(CLASSES_ERROR)
  }
}

function $(el) {
  return new DOMWrapper(el)
}

$.create = (tagName, classNames = []) => {
  const el = document.createElement(tagName)
  const $el = $(el).insertClasses(classNames)
  return $el
}

export {$, DOMWrapper}

