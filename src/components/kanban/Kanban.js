import {AppComponent} from '@core'

import Header from '../header/Header';
import Surface from '../surface/Surface';
import Footer from '../footer/Footer';

class Kanban extends AppComponent {
  constructor() {
    super({
      classNames: 'kanban'
    })
  }

  render() {
    const b = this.$build

    return `
      ${b(Header)}
      ${b(Surface)}
      ${b(Footer)}
    `
  }
}

export default Kanban
