import './scss/index.scss'
import {createApp} from './core/AppFactory'
import Kanban from './components/kanban/Kanban'

createApp(
    document.getElementById('app'),
    Kanban
)
