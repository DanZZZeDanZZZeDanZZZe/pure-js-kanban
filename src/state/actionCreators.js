import {
  ACTIVATE_CARD,
  SELECTING_TASK,
  ADDING_NEW_TASK,
  SHOW_TASK_INFO,
  SHOW_CARD_DELETION,
  CLOSE_MODAL_WINDOW,
  ADDING_TASK_DESCRIPTION,
  DELETE_COMPLETED_TASKS,
  SHOW_CARD_ADDING,
  DELETE_CARDS,
  ADD_CARDS
} from './types';

export function activateСard(title) {
  return {
    type: ACTIVATE_CARD,
    data: {title}
  }
}

export function deactivateСards() {
  return activateСard(null)
}

export function selectingTask(text, index) {
  return {
    type: SELECTING_TASK,
    data: {text, index}
  }
}

export function addingTaskDescription(title, text) {
  return {
    type: ADDING_TASK_DESCRIPTION,
    data: {title, text}
  }
}

export function addingNewTask(text) {
  return {
    type: ADDING_NEW_TASK,
    data: text
  }
}

export function showTaskInfo(text) {
  return {
    type: SHOW_TASK_INFO,
    data: text
  }
}

export function showCardDeletion() {
  return {
    type: SHOW_CARD_DELETION
  }
}

export function showCardAdding() {
  return {
    type: SHOW_CARD_ADDING
  }
}

export function closeModalWindow() {
  return {
    type: CLOSE_MODAL_WINDOW,
  }
}

export function deleteCompletedTasks() {
  return {
    type: DELETE_COMPLETED_TASKS,
  }
}

export function deleteCards(titles) {
  return {
    type: DELETE_CARDS,
    data: {titles}
  }
}

export function addCards(namesOfNewCard) {
  return {
    type: ADD_CARDS,
    data: {namesOfNewCard}
  }
}
