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
  ['SHOW_CARD_DELETION']: (state) => {
    state.modalWindow = {type: 'card delition'}
    return state
  },
  ['SHOW_CARD_ADDING']: (state) => {
    state.modalWindow = {type: 'card adding'}
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

  ['DELETE_COMPLETED_TASKS']: (state) => {
    state.cards[state.cards.length - 1].tasks = []
    return state
  },
  ['DELETE_CARDS']: (state, {titles}) => {
    state.cards = state.cards.filter(({title}) => {
      return !titles.find(t => t === title)
    })
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
