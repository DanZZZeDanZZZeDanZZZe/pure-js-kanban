const cards = ['Backlog', 'Ready', 'In progress', 'Finished']

export const defaultState = {
  cards: cards.map(title => {
    return {title, tasks: []}
  }),
  activeCard: null
}
