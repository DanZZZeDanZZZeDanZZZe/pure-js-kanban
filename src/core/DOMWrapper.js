const CONSTRUCTOR_ERROR =
    'The parameter must be either a string or an HTML element'
const CREATE_ERROR =
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
}

export function $(el) {
  return new DOMWrapper(el)
}

$.create = (tagName, classNames) => {
  const el = document.createElement(tagName)
  if (typeof classNames === 'string') {
    classNames = classNames.trim().split(' ')
  }
  if (classNames instanceof Array) {
    classNames.forEach(className => el.classList.add(className))
    return $(el)
  }
  throw new Error(CREATE_ERROR)
}
