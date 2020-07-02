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

export {
  adjustEl,
  capitalize,
  isEqual
}
