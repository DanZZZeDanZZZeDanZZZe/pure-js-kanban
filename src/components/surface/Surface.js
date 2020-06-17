const {AppComponent} = require('@core/framework');

class Surface extends AppComponent {
  classNames = 'surface'
  html = `
    <div class="card-holder"></div>
  `

  constructor($root) {
    const options = {

    }
    super($root, options)
  }
}

export default Surface
