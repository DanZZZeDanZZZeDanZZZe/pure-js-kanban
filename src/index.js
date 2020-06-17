import {ComponentFactory, $} from '@core/framework'
import {Header, Surface, Footer} from './components'
import './scss/index.scss'

const $app = document.getElementById('app')
const $wrap = $.create('div', 'kanban')
const appFactory = new ComponentFactory([Header, Surface, Footer])

appFactory.createStructure($wrap).render($app)

