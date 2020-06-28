import {AppComponent} from './AppComponent'

export class AppStateComponent extends AppComponent {
  constructor(options) {
    super(options)
    this.state = options?.state || {}
  }

  setState(state) {
    this.state = {...this.state, state}
    this.update()
  }
}
