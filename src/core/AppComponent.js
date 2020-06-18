import DOMListener from './DOMListener'

class AppComponent extends DOMListener {
  static supervisor = null
  classNames = ''
  html = ''

  constructor($id, options) {
    const listeners = listeners in options ?
      options.listeners :
      []
    super($id, options.listeners)
  }

  getRoot() {
    return this.$root
  }
}

export {AppComponent}
