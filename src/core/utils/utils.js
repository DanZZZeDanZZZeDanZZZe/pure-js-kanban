import {DOMWrapper, $, errorMessages} from '@core'

const {WRAPPER_HTML_ERROR} = errorMessages

export function adjustEl(el) {
  if (el instanceof DOMWrapper) {
    return el
  }
  if (el instanceof HTMLElement) {
    return $(el)
  }
  throw new Error(WRAPPER_HTML_ERROR)
}

export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

