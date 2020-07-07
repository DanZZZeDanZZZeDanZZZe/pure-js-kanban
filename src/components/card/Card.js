import {AppComponent} from '@core'
import {activateСard} from '../../state/actionCreators'
import TaskSelection from './TaskSelection'
import TaskInput from './TaskInput'

class Card extends AppComponent {
  constructor({index, title}) {
    super({
      classNames: 'card',
      watch: ['activeCard'],
      events: ['click']
    })

    const {$appState} = this
    const {cards} = $appState

    this.index = index
    this.title = title
    this.tasks = cards[index].tasks
    this.activity = $appState.activeCard === title
    this.abilityToAdd = checkAvailability(cards, index)

    this.isCardButton = event => this.$calledOut('card-button', event)
  }

  onClick(event) {
    if (this.isCardButton(event) && this.abilityToAdd) {
      this.$dispatch(activateСard(this.title))
    }
  }

  render() {
    const {
      $build, title, index, tasks, activity
    } = this
    const isFirstCard = index === 0

    return `
      <div class="card-header">
        <p class="title">${title}</p>
      </div>

      <div class="content">
        ${activity && !isFirstCard ?
          $build(TaskSelection, {index}) :
          createTasks(tasks)}
        <div class="card-control-panel">
        ${activity && isFirstCard ?
            $build(TaskInput, {index}):
            `<button 
              ${this.abilityToAdd ? '' : 'disabled'}
              type="button" 
              class="add-button"
              data-type="card-button"
            >
              <i class="material-icons">add</i>
              <p>Add card<p>
            </button>`}
        </div>    
      </div>
      <div class="card-footer"></div>
    `
  }
}

function createTasks(tasks) {
  return tasks
      .map(task => `<div class="task">${task}</div>`)
      .join('')
}

function checkAvailability(cards, index) {
  if (index === 0) return true
  return !!cards[index - 1].tasks.length
}

export default Card
