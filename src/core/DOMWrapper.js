import {errorMessages, utils} from '@core'

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

  on(eventName, listener) {
    this.el.addEventListener(eventName, listener)
    return this
  }

  off(eventName, listener) {
    this.el.removeEventListener(eventName, listener)
    return this
  }

  html(text, pos) {
    if (text) {
      this.insertHTML(text, pos)
      return this
    }
    return this.el.outerHTML
  }

  insertHTML(text, pos = 'afterbegin') {
    this.el.insertAdjacentHTML(pos, text)
    return this
  }

  append(el) {
    const $el = adjustEl(el)
    this.el.append($el.el)
  }

  get parent() {
    const node = $(this.el.parentNode)
    return node
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

  dataset(name, value) {
    if (name && value) {
      this.el.dataset[name] = value
    }
    return this
  }

  find(selector) {
    return $(this.el.querySelector(selector))
  }

  findAll(selector) {
    return Array.prototype.map.call(
        this.el.querySelectorAll(selector),
        el => $(el)
    )
  }

  findData(name, value) {
    return this
        .find(`[data-${name}="${value}"]`)
  }

  findAllData(name, value) {
    return this
        .findAll(`[data-${name}="${value}"]`)
  }

  findByDataID(id) {
    return this.findData('id', id)
  }

  outer(html) {
    if (html) {
      this.el.outerHTML= html
      return this
    }
    return this.el.outerHTML
  }

  inner(html) {
    if (html) {
      this.el.innerHTML= html
      return this
    }
    return this.el.innerHTML
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

