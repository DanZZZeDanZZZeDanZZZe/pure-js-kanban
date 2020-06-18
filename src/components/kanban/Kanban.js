import {AppComponent, comp} from '@core/framework'

import Header from '../header/Header';
import Surface from '../surface/Surface';
import Footer from '../footer/Footer';

class Kanban extends AppComponent {
  constructor($root) {
    const options = {

    }
    super($root, options)
  }

  classNames = 'kanban'
  html = comp(
      Header,
      Surface,
      Footer
  )
}

export default Kanban