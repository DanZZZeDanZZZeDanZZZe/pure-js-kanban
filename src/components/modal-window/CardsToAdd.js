import {AppComponent} from '@core'

class CardsToAdd extends AppComponent {
  constructor() {
    super({
      classNames: 'list-of-cards list-of-cards_added',
      tagName: 'div',
    })
  }

  createCardList() {
    const {cards} = this.$appState
    const addedCard = `
      <div
        class="list-of-cards__added-card added-card"
        data-type="added-card"
      >
        <button 
          class="added-card__button cleared-button"
          data-type="button"
          type="button"
        >
        </button>
        <input
          class="added-card__input"
          type="text"
        >
        </input>
      </div>
    `
    const cardList = cards.map(({title}) => {
      return `  
        ${addedCard}
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
    cardList.push(addedCard)
    return cardList.join('')
  }

  toggleAddedCard(card) {
    card.classList.toggle('added-card_active')
    // const type = card.dataset('type')
    // if (type === 'card') {
    //   card.dataset('type', 'card-active')
    // } else {
    //   card.dataset('type', 'card')
    // }
  }

  render() {
    return this.createCardList()
  }

  prepare() {
    this.cards = this.$extractAll('added-card')
    this.cards.forEach(card => {
      card.on('click', e => {
        console.log('prepare -> e', e)
        if (this.$calledOut('button', e)) {
          this.toggleAddedCard(card)
        }
      } )
    })
    this.$listen('ModalWindow: pressing ok', () => {
      // const removableСards = this.$extractAll('card-active')
      // const titles = removableСards.map(card => {
      //   return card.findData('type', 'card-title').inner(null, true)
      // })
      // this.$dispatch(deleteCards(titles))
    })
  }

  beforeDestruction() {
    this.cards.forEach(card => {
      card.off('click', () => this.toggleAddedCard(card) )
    })
  }
}

export default CardsToAdd
