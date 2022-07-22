import { TasksStateType } from '../App'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer'
import { removeTodolistAC } from './todolists-reducer'

let startState: TasksStateType

beforeEach(() => {
  startState = {
    id1: [
      { id: 'id1', title: 'HTML', isDone: true },
      { id: 'id2', title: 'CSS', isDone: false },
      { id: 'id3', title: 'JS', isDone: false },
    ],
    id2: [
      { id: 'id1', title: 'Milk', isDone: true },
      { id: 'id2', title: 'Cookie', isDone: true },
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
  const endState = tasksReducer(startState, changeTaskStatusAC('id1', 'id2', true))

  expect(endState.id1[1].isDone).toBe(true)
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
