import {AppComponent} from '@core'

class Header extends AppComponent {
  constructor() {
    super({
      classNames: 'kanban__header header',
      tagName: 'header',
    })
  }

  render() {
    const buttonClasses = [
      'user-menu__button',
      'cleared-button'
    ]

    return `
      <h1 class="header__logo">Kanban</h1>

      <div class="header__user-menu user-menu">
        <button class="${buttonClasses.join(' ')}" data-type="button">
          <span></span>      
        </button>
        <ul class="user-menu__list" data-type="list">
          <li class="user-menu__item">Add card</li>
          <li class="user-menu__item">Delete card</li>
          <li class="user-menu__item">Delete completed tasks</li>
        </ul>
      </div>
    `
  }

  prepare() {
    this.button = this.$extract('button')
    this.list = this.$extract('list')
    this.toggleMenu = () => {
      this.button.classList.toggle('user-menu__button_active')
      this.list.classList.toggle('user-menu__list_active')
    }
    this.button.on('click', this.toggleMenu)
  }

  beforeDestruction() {
    console.log('уничтоженоо')
    this.button.off('click', this.toggleMenu)
  }
}

export default Header
