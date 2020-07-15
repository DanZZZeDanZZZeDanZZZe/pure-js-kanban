import {normalize} from '@/core/utils'

const cases = {
  ['ACTIVATE_CARD']: (state, {title}) => {
    state.activeCard = title
    console.log('state', state)
    return state
  },
  ['SELECTING_TASK']: (state, {index, text}) => {
    addTask(state, index, text)
    deleteTask(state, index - 1, text)
    return state
  },
  ['ADDING_NEW_TASK']: (state, text) => {
    addTask(state, 0, text)
    return state
  },
  ['SHOW_TASK_INFO']: (state, {index, title}) => {
    const task = findTask(state, title, index)
    state.modalWindow = {type: 'task info', task}
    return state
  },
  ['CLOSE_MODAL_WINDOW']: (state) => {
    state.modalWindow = null
    return state
  },
  ['ADDING_TASK_DESCRIPTION']: (state, {title, text}) => {
    const task = findTask(state, title)
    task.text = text.trim()
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
  state.cards[index].tasks.push({title: text, text: ''})
}

function findTask(state, title, cardIndex) {
  const getTaskList = () => {
    if (cardIndex !== undefined) {
      return state.cards[cardIndex].tasks
    }
    return state.cards.reduce((taskList, {tasks}) => {
      return [...taskList, ...tasks]
    }, [])
  }
  return getTaskList().find(t => normalize(t.title) === normalize(title))
}

function deleteTask(state, index, text) {
  const card = state.cards[index]
  card.tasks = card.tasks.filter(t => {
    return normalize(t.title) !== normalize(text)
  })
}
