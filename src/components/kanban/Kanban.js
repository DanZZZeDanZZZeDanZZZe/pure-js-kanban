import {AppComponent, build} from '@core'

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
    return `
      ${build(Header)}
      ${build(Surface)}
      ${build(Footer)}
    `
  }
}

export default Kanban
