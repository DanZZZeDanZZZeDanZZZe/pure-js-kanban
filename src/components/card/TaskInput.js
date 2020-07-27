import {AppComponent} from '@core'
import {addingNewTask} from '../../state/actionCreators'
import {App} from '@/core'
import {normalize} from '../../core'

class TaskInput extends AppComponent {
  constructor() {
    super({
      classNames: 'task-input',
      events: ['keydown']
    })
  }

  onKeydown(event) {
    const {value} = event.target
    if (event.key === 'Enter') {
      if (findDuplicate(value)) {
        alert('Such a task already exists')
      } else {
        this.$dispatch(addingNewTask(value))
      }
    }
  }

  render() {
    return `${
      '<input type="text" data-type="task-input"/> '
    }`
  }

  prepare() {
    this.$extract('task-input').focus()
  }
}

function findDuplicate(title) {
  const {cards} = App.state
  const titles = cards.reduce((titles, card) => {
    const {tasks} = card
    const newTitles = tasks.map(task => {
      return normalize(task.title)
    })
    return [...newTitles, ...titles]
  }, [])
  return titles.indexOf(normalize(title)) !== -1 ? true : false
}

export default TaskInput

