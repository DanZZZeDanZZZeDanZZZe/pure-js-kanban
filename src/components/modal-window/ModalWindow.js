import {AppComponent} from '@core'
import {App} from '@/core'
import {closeModalWindow} from '../../state/actionCreators'
import TaskInfo from './TaskInfo'

class ModalWindow extends AppComponent {
  constructor() {
    super({
      classNames: getClasses(),
      watch: ['modalWindow'],
      events: ['click', 'keydown']
    })

    this.ok = () => {
      this.$notify('ModalWindow: pressing ok')
      this.$dispatch(closeModalWindow())
    }

    this.exit = () => {
      this.$dispatch(closeModalWindow())
    }
  }

  onKeydown() {
    if (event.key === 'Escape') {
      this.exit()
    }

    if (event.key === 'Enter') {
      this.ok()
    }
  }

  onClick() {
    if (this.$calledOut('exit-button', event)) {
      this.exit()
    }
    if (this.$calledOut('ok-button', event)) {
      this.ok()
    }
  }

  render() {
    const {$build} = this

    if (!(learnActivity())) {
      return '<div></div>'
    }

    const {type} = this.$appState.modalWindow

    return `
      <div class="modal-window__content content">
        <div class="content__header">
          <button 
            type="button" 
            class="content__header__button" 
            data-type="exit-button"
          >
            <i class="material-icons">clear</i>        
          </button>
        </div>
        <div class="content__main">
        ${createContent(type, $build)}
        </div>
        <div class="content__footer">
          <button
            type="button" 
            class="content__footer__button"
            data-type="ok-button"
          >
            OK      
          </button>
        </div>  
      </div>
    `
  }
}

function getClasses() {
  return learnActivity() ? 'modal-window' : 'hidden-modal-window'
}

function learnActivity() {
  return !!App.state.modalWindow
}

function createContent(type, $build) {
  switch (type) {
    case 'task info':
      return $build(TaskInfo)
    default:
      return '<div></div>'
  }
}

export default ModalWindow
