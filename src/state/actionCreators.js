import {ACTIVATE_CARD, SELECTING_TASK, ADDING_NEW_TASK} from './types';

export function activateСard(title) {
  return {
    type: ACTIVATE_CARD,
    data: {title}
  }
}

export function selectingTask(text, index) {
  return {
    type: SELECTING_TASK,
    data: {text, index}
  }
}

export function addingNewTask(text) {
  return {
    type: ADDING_NEW_TASK,
    data: text
  }
}
