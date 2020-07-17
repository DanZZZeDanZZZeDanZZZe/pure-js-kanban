import {AppComponent} from '@core'

class Header extends AppComponent {
  constructor() {
    const options = {
      classNames: 'kanban__header header',
      tagName: 'header',
      events: ['click']
    }
    super(options)
  }

  onClick() {
    this.$notify('surface: lose focus')
  }

  render() {
    const buttonClasses = [
      'user-menu__button',
      'cleared-button',
    ]

    return `
      <div class="header__logo">
        <h1>Kanban</h1>
      </div>

      <div class="header__user-menu user-menu">
        <button class="${buttonClasses.join(' ')}">
          <span></span>      
        </button>
      </div>
    `
  }
}

export default Header
