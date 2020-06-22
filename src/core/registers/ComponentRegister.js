export class ComponentRegister {
  static singleton = null

  constructor(comps = []) {
    this.comps = comps
  }

  connect($mountPoint, start, end) {
    const connect = comp => {
      return comp.connect($mountPoint)
    }
    const comps = this.getRange(start, end)
    comps.forEach(connect)
    return this
  }

  add(compInstance) {
    this.comps.push(compInstance)
    return this
  }

  findComponent(id) {
    return this.comps
        .filter(comp => comp.id === id)[0]
  }

  deleteComponent(id) {
    this.comps = this.comps.filter(comp => comp.id !== id)
    return this
  }

  getConstructor(comp) {
    return this
  }

  hangEvents(start, end) {
    const comps = this.getRange(start, end)
    comps.forEach(comp => {
      comp.init()
    })
    return this
  }

  prepare(start, end) {
    const comps = this.getRange(start, end)
    comps.forEach(comp => {
      comp.prepare()
    })
    return this
  }

  get content() {
    return this.comps
  }

  getRange(start, end) {
    return start ?
        this.comps.slice(start, end) :
        this.comps
  }

  defineClass($comp) {}
}
