import {AppComponent, build} from '@core'
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
      ${cards(this.$state.length)}
    </div>
    `
  }
}

function cards(length) {
  return new Array(length)
      .fill(null)
      .map((item, index) => {
        return build(Card, {
          title: index
        })
      })
      .join('')
}

export default Surface
