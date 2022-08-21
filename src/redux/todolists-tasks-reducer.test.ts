import { addTodolistAC, TodolistDomainType, todolistsReducer } from './todolists-reducer'
import { tasksReducer, TasksStateType } from './tasks-reducer'
import { TaskPriorities, TaskStatuses } from '../api/todolist-api'

let tasksStartState: TasksStateType
let todolistsStartState: TodolistDomainType[]

beforeEach(() => {
  todolistsStartState = [{ id: 'todolistID1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 }]
  tasksStartState = {
    todolistID1: [
      { id: 'taskID1', title: 'JS', status: TaskStatuses.New, todoListId: '1', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
      { id: 'taskID1', title: 'JS', status: TaskStatuses.New, todoListId: '1', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
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
