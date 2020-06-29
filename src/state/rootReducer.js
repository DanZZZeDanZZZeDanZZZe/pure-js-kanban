const cases = {
  ['CLICK']: state => {
    state.length++
    return state
  },
  default: state => state
}

export function rootReducer(state, action) {
  const {type, data} = action
  const mod = cases[type] || cases['default']
  return mod(state, data)
}
