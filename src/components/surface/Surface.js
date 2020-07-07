import {AppComponent} from '@core'
import Card from '../card/Card';

class Surface extends AppComponent {
  constructor() {
    super({
      classNames: 'surface',
      watch: 'length'
    })
  }

  render() {
    const {$appState, $build} = this
    const {cards} = $appState
    return createCards(cards, $build)
  }
}

function createCards(cards, $build) {
  return cards.map((card, index) => {
    const {title} = card
    return $build(Card, {
      title,
      index
    })
  }).join('')
}

export default Surface
