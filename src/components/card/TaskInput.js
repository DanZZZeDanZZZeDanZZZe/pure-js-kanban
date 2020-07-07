import {AppComponent} from '@core'
import {addingNewTask} from '../../state/actionCreators'

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
      this.$dispatch(addingNewTask(value))
    }
  }

  render() {
    return `${
      '<input type="text"/> '
    }`
  }
}

export default TaskInput
