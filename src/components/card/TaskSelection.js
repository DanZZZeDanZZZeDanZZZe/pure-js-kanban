import {AppComponent} from '@core'
import {selectingTask} from '../../state/actionCreators'

class TaskSelection extends AppComponent {
  constructor({index}) {
    super({
      classNames: 'task-selection',
      events: ['click']
    })
    this.index = index
  }

  onClick(event) {
    const {textContent} = event.target
    if (this.$calledOut('task', event)) {
      this.$dispatch(selectingTask(textContent, this.index))
    }
  }

  render() {
    const {index, $appState} = this
    const {tasks} = $appState.cards[index-1]
    return createTasks(tasks)
  }
}

function createTasks(tasks) {
  return tasks
      .map(task => {
        return `
          <div 
            class="task to-choose" 
            data-type="task"
          >
          ${task.title}
          </div>
        `
      })
      .join('')
}

export default TaskSelection
