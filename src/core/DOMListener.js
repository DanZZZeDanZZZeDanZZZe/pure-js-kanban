import {COMPONENT_INSTANCES} from './errorMessages'
import utils from './utils'

const {capitalize} = utils

class DOMListener {
  constructor(events = []) {
    this.events = events
  }

  connectElement($mountPoint) {
    this.$root = $mountPoint.findData('id', this.id)
    return this
  }

  initDOMListeners() {
    if (!(this.$root)) {
      throw new Error(COMPONENT_INSTANCES)
    }
    this.events.forEach(eventName => {
      const method = getListenerName(eventName)
      if (!this[method]) {
        const name = this.classNames || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      this[method] = this[method].bind(this)
      this.$root.on(eventName, this[method])
    })
  }

  removeDOMListeners() {
    this.events.forEach(eventName => {
      const method = getListenerName(eventName);
      if (this[method]) {
        this.$root.off(eventName, this[method])
      }
    })
    this.$root;
  }
}

export default DOMListener

function getListenerName(eventName) {
  return 'on' + capitalize(eventName)
}
