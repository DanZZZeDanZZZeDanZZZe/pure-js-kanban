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
    return `
    <div class="card-holder">
      ${cards(this.$state.length, this.$build)}
    </div>
    `
  }
}

function cards(length, b) {
  return new Array(length)
      .fill(null)
      .map((item, index) => {
        return b(Card, {
          title: index
        })
      })
      .join('')
}

export default Surface
