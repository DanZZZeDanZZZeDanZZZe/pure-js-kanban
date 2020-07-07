import {AppComponent} from '@core'

class Footer extends AppComponent {
  constructor() {
    super({
      classNames: 'footer',
      watch: ['cards']
    })

    const {cards} = this.$appState
    const last = cards.length - 1

    this.activeTasks = cards
        .slice(0, last)
        .reduce((count, card) => {
          return count + card.tasks.length
        }, 0)
    this.finishedTasks = cards[last].tasks.length
  }

  render() {
    return `
      <div class="footer-statistics">
        <p>Active taslks: ${this.activeTasks}</p>
        <p>Finished tasks: ${this.finishedTasks}</p>
      </div>
      <div class="footer-user">
        <p>Name</p>
      </div>
    `
  }
}

export default Footer
