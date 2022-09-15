import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistStatus,
  changeTodolistTitle,
  removeTodolist,
  TodolistDomainType,
  todolistsReducer,
} from '../todolists-reducer'

let startState: TodolistDomainType[]

beforeEach(() => {
  startState = [
    { id: '1', title: 'What to learn', filter: 'all', order: 0, addedDate: '', status: 'idle' },
    { id: '2', title: 'What to buy', filter: 'active', order: 0, addedDate: '', status: 'idle' },
  ]
})

test('filter in todolist should be changed', () => {
  const endState = todolistsReducer(startState, changeTodolistFilter({ todolistID: '1', filter: 'completed' }))

  expect(endState[0].filter).toBe('completed')
  expect(endState[1].filter).toBe('active')
})

test('todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolist({ todolistID: '1' }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe('2')
})

test('todolist title should be changed', () => {
  const newTitle = 'The Hobbit'

  const endState = todolistsReducer(startState, changeTodolistTitle({ todolistID: '1', title: newTitle }))

  expect(endState[0].title).toBe(newTitle)
})

test('todolist should be added', () => {
  const newTodolistTitle = 'The Hobbit'
  const newTodolist: TodolistDomainType = {
    id: '6',
    title: newTodolistTitle,
    filter: 'active',
    order: 0,
    addedDate: '',
    status: 'idle',
  }
  const action = addTodolist({ todolist: newTodolist })

  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe(action.payload.todolist.id)
})

test('correct entity status of todolist should be changed', () => {
  const endState = todolistsReducer(startState, changeTodolistStatus({ todolistID: '1', status: 'loading' }))

  expect(endState[0].status).toBe('loading')
  expect(endState[1].status).toBe('idle')
})
