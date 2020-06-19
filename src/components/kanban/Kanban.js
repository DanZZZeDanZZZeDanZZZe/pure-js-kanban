import {AppComponent, comp} from '@core'

import Header from '../header/Header';
import Surface from '../surface/Surface';
import Footer from '../footer/Footer';

class Kanban extends AppComponent {
  constructor() {
    const options = {

    }
    super(options)
  }

  classNames = 'kanban'
  html = comp(
      Header,
      Surface,
      Footer
  )
}

export default Kanban
