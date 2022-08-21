import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
  TasksStateType,
} from './tasks-reducer'
import { removeTodolistAC } from './todolists-reducer'
import { TaskPriorities, TaskStatuses } from '../api/todolist-api'

let startState: TasksStateType

beforeEach(() => {
  startState = {
    id1: [
      { id: 'id1', title: 'HTML', status: TaskStatuses.Completed, todoListId: 'id1', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
      { id: 'id2', title: 'CSS', status: TaskStatuses.New, todoListId: 'id1', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
      { id: 'id3', title: 'JS', status: TaskStatuses.New, todoListId: 'id1', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
    ],
    id2: [
      { id: 'id1', title: 'Milk', status: TaskStatuses.Completed, todoListId: 'id2', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
      { id: 'id2', title: 'Cookie', status: TaskStatuses.Completed, todoListId: 'id2', startDate: '', addedDate: '', deadline: '', order: 0, priority: TaskPriorities.Low, description: '' },
    ],
  }
})

test('task should be added', () => {
  const newTaskTitle = 'React'

  const endState = tasksReducer(startState, addTaskAC('id1', newTaskTitle))

  expect(endState.id1[0].title).toBe(newTaskTitle)
})

test('task should be removed', () => {
  const endState = tasksReducer(startState, removeTaskAC('id1', 'id2'))

  expect(endState.id1.length).toBe(2)
  expect(endState.id1[1].id).toBe('id3')
})

test('task status should be changed', () => {
  const endState = tasksReducer(startState, changeTaskStatusAC('id1', 'id2', TaskStatuses.Completed))

  expect(endState.id1[1].status).toBe(TaskStatuses.Completed)
})

test('task title should be changed', () => {
  const newTaskTitle = 'React'
  const endState = tasksReducer(startState, changeTaskTitleAC('id1', 'id2', newTaskTitle))

  expect(endState.id1[1].title).toBe(newTaskTitle)
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, removeTodolistAC('id1'))

  expect(endState['id1']).toBeUndefined()
})
