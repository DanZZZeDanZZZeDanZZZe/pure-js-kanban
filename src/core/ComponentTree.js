export class CompnentTree {
  constructor(components) {
    this.components = components
    this.branches = this.createBranch()
  }

  createBranch(component = null) {
    let comps = this.components
    return createBranch(component)

    function createBranch(component) {
      if (component === null) {
        component = comps.find(c => c.parent === null)
      }
      let children = comps.filter(c => c.parent === component)
      comps = comps.filter(
          c => c !== component
      )
      if (children.length > 0) {
        children = children.map(ch => {
          return createBranch(ch)
        })
      }
      return {
        component,
        children
      }
    }
  }
}
