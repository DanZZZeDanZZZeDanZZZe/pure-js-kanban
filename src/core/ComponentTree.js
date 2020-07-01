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
      if (children.length !== 0) {
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

  connectToHTML($root) {
    const $elements = $root.findAllData('type', 'component')
    connect(this.branches)

    function connect(treeNode) {
      const $element = $elements.splice(0, 1)[0]
      const {children, component} = treeNode
      component.init($element)

      if (children.length !== 0) {
        children.forEach(c => connect(c))
      }
    }
  }
}
