import DOMListener from './DOMListener'

class AppComponent extends DOMListener {
  classNames = ''
  html = ''

  constructor($root, options) {
    const listeners = listeners in options ?
      options.listeners :
      []
    super($root, options.listeners)
  }

  getRoot() {
    return this.$root
  }
}

export default AppComponent
