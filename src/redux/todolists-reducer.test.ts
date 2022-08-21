import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC, TodolistDomainType,
  todolistsReducer,
} from './todolists-reducer'

let startState: TodolistDomainType[]

beforeEach(() => {
  startState = [
    { id: '1', title: 'What to learn', filter: 'all', order: 0, addedDate: '' },
    { id: '2', title: 'What to buy', filter: 'active', order: 0, addedDate: '' },
  ]
})

test('filter in todolist should be changed', () => {
  const endState = todolistsReducer(startState, changeTodolistFilterAC('1', 'completed'))

  expect(endState[0].filter).toBe('completed')
  expect(endState[1].filter).toBe('active')
})

test('todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC('1'))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe('2')
})

test('todolist title should be changed', () => {
  const newTitle = 'The Hobbit'

  const endState = todolistsReducer(startState, changeTodolistTitleAC('1', newTitle))

  expect(endState[0].title).toBe(newTitle)
})

test('todolist should be added', () => {
  const newTodolistTitle = 'The Hobbit'
  const action = addTodolistAC(newTodolistTitle)

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(action.id)
})
