import {DOMWrapper, $, errorMessages} from '@core'

const {WRAPPER_HTML_ERROR} = errorMessages

function adjustEl(el) {
  if (el instanceof DOMWrapper) {
    return el
  }
  if (el instanceof HTMLElement) {
    return $(el)
  }
  throw new Error(WRAPPER_HTML_ERROR)
}

function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

function copyFields(obj) {
  return JSON.parse(JSON.stringify(obj))
}

function storage(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    return JSON.parse(localStorage.getItem(key))
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function normalize(str) {
  return str.trim().toLowerCase()
}

export {
  adjustEl,
  capitalize,
  isEqual,
  compose,
  copyFields,
  storage,
  normalize
}
