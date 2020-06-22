import {AppComponent} from '@core'

class Header extends AppComponent {
  classNames = 'header'
  constructor() {
    const options = {

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
