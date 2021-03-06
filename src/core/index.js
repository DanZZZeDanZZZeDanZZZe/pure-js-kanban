import * as errorMessages from '@core/errorMessages'
import {
  adjustEl,
  capitalize,
  isEqual,
  compose,
  storage,
  normalize
} from '@core/utils'
import {AppComponent} from '@core/AppComponent'
import DOMListener from '@core/DOMListener'
import {DOMWrapper, $} from '@core/DOMWrapper'
import {
  AppCreator,
  createEventManager,
  createStore
} from '@core/creators'

export {
  errorMessages,
  createEventManager,
  AppComponent,
  DOMListener,
  DOMWrapper,
  AppCreator as App,
  createStore,
  adjustEl,
  capitalize,
  isEqual,
  compose,
  storage,
  normalize,
  $
}

