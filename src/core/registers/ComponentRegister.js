export class ComponentRegister {
  static singleton = null

  constructor(comps = []) {
    this.comps = comps
  }

  connect($mountPoint, start, end) {
    const connect = comp => {
      return comp.connect($mountPoint)
    }
    const comps = start ?
        this.comps.slice(start, end) :
        this.comps
    comps.forEach(connect)
    return this
  }

  add(compInstances) {
    compInstances.forEach(comp => {
      this.comps.push(comp)
    })
    return this
  }

  findComponent(id) {
    console.log(this.comps)
    return this.comps
        .filter(comp => comp.id === id)[0]
  }

  getConstructor(comp) {
    return this
  }

  get content() {
    return this.comps
  }

  defineClass($comp) {}
}
