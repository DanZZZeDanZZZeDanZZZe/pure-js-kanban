class DOMListener {
  constructor(id, listeners = []) {
    this.id = `${id}`
  }

  connectElement($mountPoint) {
    this.$root = $mountPoint.findData('id', this.id)
    return this
  }
}

export default DOMListener
