import {AppComponent} from '@core'
import {deleteCards} from '../../state/actionCreators'

class CardForDeletion extends AppComponent {
  constructor() {
    super({
      classNames: 'list-of-cards',
      tagName: 'div',
    })
  }

  createCardList() {
    const {cards} = this.$appState
    const cardList = cards.map(({title}) => {
      return `  
        <div 
          class="list-of-cards__card"
          data-type="card"
        >
          <span 
            class="list-of-cards__title"
            data-type="card-title"
          >${title}</span>
        </div>
      `
    })
    return cardList.join('')
  }

  toggleCard(card) {
    card.classList.toggle('list-of-cards__card_active')
    const type = card.dataset('type')
    if (type === 'card') {
      card.dataset('type', 'card-active')
    } else {
      card.dataset('type', 'card')
    }
  }

  render() {
    return this.createCardList()
  }

  prepare() {
    this.cards = this.$extractAll('card')
    this.cards.forEach(card => {
      card.on('click', () => this.toggleCard(card) )
    })
    this.$listen('ModalWindow: pressing ok', () => {
      const removableСards = this.$extractAll('card-active')
      const titles = removableСards.map(card => {
        return card.findData('type', 'card-title').inner(null, true)
      })
      this.$dispatch(deleteCards(titles))
    })
  }

  beforeDestruction() {
    this.cards.forEach(card => {
      card.off('click', () => this.toggleCard(card) )
    })
  }
}

export default CardForDeletion
