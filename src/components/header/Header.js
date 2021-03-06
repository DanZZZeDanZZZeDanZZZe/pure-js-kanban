import {AppComponent} from '@core'
import {
  deleteCompletedTasks,
  showCardDeletion,
  showCardAdding
} from '@/state/actionCreators'

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
          <li 
            class="user-menu__item"
            data-type="adding-card"
          >Add card</li>
          <li 
            class="user-menu__item"
            data-type="delete-card"
          >Delete card</li>
          <li 
            class="user-menu__item" 
            data-type="delete-completed"
          >Delete completed tasks</li>
        </ul>
      </div>
    `
  }

  prepare() {
    this.button = this.$extract('button')
    this.list = this.$extract('list')
    this.deleteCompletedItem = this.$extract('delete-completed')
    this.deleteCardItem = this.$extract('delete-card')
    this.addingCardItem = this.$extract('adding-card')

    this.toggleMenu = () => {
      this.button.classList.toggle('user-menu__button_active')
      this.list.classList.toggle('user-menu__list_active')
    }

    this.deleteCompleted = () => {
      if (confirm('Delete all completed tasks?')) {
        this.$dispatch(deleteCompletedTasks())
        this.toggleMenu()
      }
    }

    this.showCardDeletion = () => {
      this.$dispatch(showCardDeletion())
      this.toggleMenu()
    }

    this.showCardAdding = () => {
      this.$dispatch(showCardAdding())
      this.toggleMenu()
    }


    this.button.on('click', this.toggleMenu)
    this.deleteCompletedItem.on('click', this.deleteCompleted)
    this.deleteCardItem.on('click', this.showCardDeletion)
    this.addingCardItem.on('click', this.showCardAdding)
  }

  beforeDestruction() {
    this.button.off('click', this.toggleMenu)
    this.deleteCompletedItem.off('click', this.deleteCompleted)
    this.deleteCardItem.off('click', this.showCardDeletion)
    this.addingCardItem.off('click', this.showCardAdding)
  }
}

export default Header
