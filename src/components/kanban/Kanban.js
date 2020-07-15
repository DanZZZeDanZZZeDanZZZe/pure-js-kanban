import {AppComponent} from '@core'

import Header from '../header/Header';
import Surface from '../surface/Surface';
import Footer from '../footer/Footer';
import ModalWindow from '../modal-window/ModalWindow';

class Kanban extends AppComponent {
  constructor() {
    super({
      classNames: 'kanban',
    })
  }

  render() {
    const {$build, $appState} = this

    return `
      ${$build(Header)}
      ${$build(Surface)}
      ${$build(Footer)}
      ${$build(ModalWindow, $appState)}
    `
  }
}

export default Kanban
