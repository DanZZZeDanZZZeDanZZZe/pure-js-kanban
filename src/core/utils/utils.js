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

export {adjustEl}
