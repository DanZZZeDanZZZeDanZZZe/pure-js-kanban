export class CompnentTree {
  constructor(components) {
    this.tree = this.createBranch(components)
  }

  createBranch(components, component = null) {
    let comps = components

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

  connectToHTML($root, branch = this.tree) {
    let $elements = $root.findAllData('type', 'component')
    if ($root.dataset()['type'] === 'component') {
      $elements = [$root, ...$elements]
    }
    connect(branch)

    function connect(branch) {
      const $element = $elements.splice(0, 1)[0]
      const {children, component} = branch
      component.init($element)

      if (children.length !== 0) {
        children.forEach(c => connect(c))
      }
    }
    return this
  }

  updateBranch($updatePoint, components, oldComponent) {
    const component = components.find(c => {
      return !components.includes(c.parent)
    })
    const newBranch = this.createBranch(components, component)
    const oldBranch = this.findBranch(oldComponent)

    this.replaceBranch(oldBranch, newBranch)
    this.connectToHTML($updatePoint, oldBranch)
    return this
  }

  findBranch(comp) {
    const branch = this.tree

    const findBranch = branch => {
      const {component, children} = branch
      if (component === comp) {
        return branch
      }
      for (const key of children) {
        const branch = findBranch(key)
        if (branch) return branch
      }
    }

    return findBranch(branch)
  }

  replaceBranch(oldBranch, newBranch) {
    oldBranch.component = newBranch.component
    oldBranch.children = newBranch.children
    return this
  }

  getState() {
    return this.tree
  }
}
