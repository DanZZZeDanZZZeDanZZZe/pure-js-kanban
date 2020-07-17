import '@/scss/index.scss'
import '@/scripts'
import Kanban from './components/kanban/Kanban'
import {App} from '@/core'
import {rootReducer} from './state/rootReducer'
import {defaultState} from './state/defaultState'
import {storage} from './core/utils'

const state = storage('state') || defaultState

App.init(
    document.getElementById('app'),
    Kanban,
    rootReducer,
    state
)
