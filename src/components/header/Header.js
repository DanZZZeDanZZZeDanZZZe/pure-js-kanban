import {AppComponent} from '@core'

class Header extends AppComponent {
  constructor() {
    const options = {
      classNames: 'header',
      tagName: 'header'
    }
    super(options)
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
