import {errorMessages, utils} from '@core/framework'

const {STR_HTML_ERROR, STR_ARR_ERROR} = errorMessages
const {adjustEl} = utils

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
    throw new Error(STR_HTML_ERROR)
  }

  insertHTML(text, pos = 'afterbegin') {
    this.el.insertAdjacentHTML(pos, text)
    return this
  }

  append(el) {
    const $el = adjustEl(el)
    this.el.append($el.el)
  }

  insertClasses(classNames) {
    if (typeof classNames === 'string') {
      classNames = classNames.trim().split(' ')
    }
    if (classNames instanceof Array) {
      this.el.classList.add(...classNames)
      return this
    }
    throw new Error(STR_ARR_ERROR)
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

