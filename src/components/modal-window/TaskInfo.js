import {AppComponent} from '@core'
import {addingTaskDescription} from '../../state/actionCreators'

class TaskInfo extends AppComponent {
  constructor() {
    super({
      classNames: 'content__main__task-info task-info',
      tagName: 'div',
    })
    const {title, text} = this.$appState.modalWindow.task
    this.text = text
    this.title = title
  }

  render() {
    return `
      <textarea 
        class="task-info__text"
        data-type="task-info"
        placeholder="Enter description"
      >${this.text}</textarea>
    `
  }

  prepare() {
    const taskInfo = this.$extract('task-info')
    taskInfo.focus()
    this.$listen('ModalWindow: pressing ok', () => {
      this.$dispatch(addingTaskDescription(this.title, taskInfo.text))
    })
  }
}

export default TaskInfo
