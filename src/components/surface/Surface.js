import {AppComponent, comp} from '@core/framework'
import Card from '../card/Card';

class Surface extends AppComponent {
  classNames = 'surface'
  html = `<div class="card-holder">
    ${
      comp(Card, Card, Card, Card)
    }
  </div>`

  constructor($root) {
    const options = {

    }
    super($root, options)
  }
}

export default Surface
