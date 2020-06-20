import './scss/index.scss'
import Kanban from './components/kanban/Kanban'
import {AppCreator} from '@/core'

AppCreator.init(
    document.getElementById('app'),
    Kanban
)
