import {AppComponent} from '@core/framework'

class Header extends AppComponent {
  classNames = 'header'
  html = `
    <div>
      <h1>Kanban</h1>
    </div>

    <div class="user-menu">
      <button>
        <i class="material-icons">all_inbox</i>        
      </button>
    </div>
  `

  constructor($root) {
    const options = {

    }
    super($root, options)
  }
}

export default Header
