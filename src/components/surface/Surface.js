import {AppComponent} from '@core'
import Card from '../card/Card';
import {deactivateСards} from '@/state/actionCreators';

class Surface extends AppComponent {
  constructor() {
    super({
      classNames: 'surface',
      tagName: 'main',
      watch: ['cards'],
      events: ['keydown']
    })
  }

  onKeydown() {
    if (event.key === 'Escape') {
      this.$dispatch(deactivateСards())
    }
  }

  render() {
    const {$appState, $build} = this
    const {cards} = $appState
    return createCards(cards, $build)
  }

  prepare() {
    this.$listen('surface: lose focus', () => {
      this.$dispatch(deactivateСards())
    })
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
