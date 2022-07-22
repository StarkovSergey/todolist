import { TasksStateType, TodolistType } from '../App'
import { addTodolistAC, todolistsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

let tasksStartState: TasksStateType
let todolistsStartState: TodolistType[]

beforeEach(() => {
  todolistsStartState = [{ id: 'todolistID1', title: 'What to learn', filter: 'all' }]
  tasksStartState = {
    todolistID1: [
      { id: 'taskID1', title: 'JS', isDone: false },
      { id: 'taskID1', title: 'JS', isDone: false },
    ],
  }
})

test('adding todolist should cause creating certain id field in tasks state', () => {
  const action = addTodolistAC('What to buy')

  const todolistsEndState = todolistsReducer(todolistsStartState, action)
  const tasksEndState = tasksReducer(tasksStartState, action)

  expect(todolistsEndState[0].id).toBe(action.id)
  expect(tasksEndState[action.id]).toBeDefined()
})
