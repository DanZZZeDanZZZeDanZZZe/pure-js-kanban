const cases = {
  ['ACTIVATE_CARD']: (state, {title}) => {
    state.activeCard = title
    return state
  },
  ['SELECTING_TASK']: (state, {index, text}) => {
    addTask(state, index, text)
    deleteTask(state, index - 1, text)
    console.log('state', state)
    return state
  },
  ['ADDING_NEW_TASK']: (state, text) => {
    addTask(state, 0, text)
    return state
  },
  default: state => state
}

export function rootReducer(state, action) {
  const {type, data} = action
  const mod = cases[type] || cases['default']
  return mod(state, data)
}

function addTask(state, index, text) {
  state.activeCard = null,
  state.cards[index].tasks.push(text)
}

function deleteTask(state, index, text) {
  const card = state.cards[index]
  card.tasks = card.tasks.filter(t => t !== text)
}
