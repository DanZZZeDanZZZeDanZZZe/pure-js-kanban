import {AppComponent} from '@core'

class Header extends AppComponent {
  constructor(options) {
    super({
      classNames: 'kanban__header header',
      tagName: 'header',
      // events: ['click']
    })

    // this.activity = options?.activity
  }

  // onClick() {
  //   this.$notify('surface: lose focus')
  //   const activity = this.activity ? false : true
  //   this.$update({activity})
  // }

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
      </div>
    `
  }

  prepare() {
    const button = this.$extract('button')
    button.on('click', () => {
      button.classList.toggle('user-menu__button_active')
    })
    // const buttonClasses = this.$extract('button').classList
    // console.log('button', this.$extract('button'))
    // console.log('Header -> prepare -> buttonClasses', buttonClasses)
    // if (this.activity) {
    //   buttonClasses.add('user-menu__button_active')
    // } else {
    //   buttonClasses.remove('user-menu__button_active')
    // }
    // console.log('Header -> prepare -> buttonClasses', buttonClasses)
  }
}

export default Header
