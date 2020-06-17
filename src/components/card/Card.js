const {AppComponent} = require('@core/framework');

class Card extends AppComponent {
  constructor($root) {
    const options = {

    }
    super($root, options)
  }

  classNames = 'card'
  html = `
    <div class="card-header">
      <p class="card-title">Title</p>
    </div>

    <div class="task-holder">
      <div class="tasks">
      </div>
      <div class="card-control-panel">
        <button class="add-button">
          <i class="material-icons">add</i>
          <p>Add card<p>
        </button>
      </div>
    </div>
  `
}

export default Card