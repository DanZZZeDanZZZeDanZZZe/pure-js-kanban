export class CompnentTree {
  constructor(components) {
    this.tree = this.createBranch(components)
  }

  createBranch(components) {
    let comps = components
    const ancestor = this.findAncestor(comps)
    return createBranch(ancestor)

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
      component.init($element).prepare()
      if (children.length !== 0) {
        children.forEach(c => connect(c))
      }
    }
    return this
  }

  findBranch(compInstance) {
    const branch = this.tree

    const findBranch = branch => {
      const {component, children} = branch
      if (component === compInstance) {
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

  findAncestor(comps) {
    return comps.find(c => {
      return !comps.includes(c.parent)
    })
  }

  getInstances(branch) {
    const instances = []

    const findInstance = branch => {
      const {component, children} = branch
      instances.push(component)

      for (const key of children) {
        const branch = findInstance(key)
        if (branch) return branch
      }
    }

    findInstance(branch)
    return instances
  }

  getState() {
    return this.tree
  }
}
