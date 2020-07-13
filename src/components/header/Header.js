import {AppComponent} from '@core'

class Header extends AppComponent {
  constructor() {
    const options = {
      classNames: 'header',
      tagName: 'header',
      events: ['click']
    }
    super(options)
  }

  onClick() {
    this.$notify('surface: lose focus')
  }

  render() {
    return `
      <div>
        <h1>Kanban</h1>
      </div>

      <div class="user-menu">
        <button>
          <i class="material-icons">all_inbox</i>        
        </button>
      </div>
    `
  }
}

export default Header
