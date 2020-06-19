import DOMListener from './DOMListener'

class AppComponent extends DOMListener {
  classNames = ''
  html = ''

  constructor(options) {
    const listeners = listeners in options ?
      options.listeners :
      []
    super(options.listeners)
  }

  getRoot() {
    return this.$root
  }
}

export {AppComponent}
