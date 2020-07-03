import './scss/index.scss'
import Kanban from './components/kanban/Kanban'
import {App} from '@/core'
import {rootReducer} from './state/rootReducer'
import {defaultState} from './state/defaultState'

App.init(
    document.getElementById('app'),
    Kanban,
    rootReducer,
    defaultState
)
