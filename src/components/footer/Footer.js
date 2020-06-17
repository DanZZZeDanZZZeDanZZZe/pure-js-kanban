const {AppComponent} = require('@core/framework');

class Footer extends AppComponent {
  constructor($root) {
    const options = {

    }
    super($root, options)
  }

  classNames = 'footer'
  html = `
    <div class="footer-statistics">
      <p>Active taslks: N</p>
      <p>Finished tasks: N</p>
    </div>
    <div class="footer-user">
      <p>Name</p>
    </div>
  `
}

export default Footer