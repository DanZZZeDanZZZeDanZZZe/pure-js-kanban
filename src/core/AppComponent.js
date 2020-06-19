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

  connect($mountPoint) {
    this.connectElement($mountPoint)
  }
}

export {AppComponent}
