import { TaskPriorities, TaskStatuses, TaskType } from '../../../api/todolist-api'
import { addTask, removeTask, tasksReducer, TasksStateType, updateTask } from '../tasks-reducer'
import { removeTodolist } from '../todolists-reducer'

let startState: TasksStateType
let testTask: TaskType

beforeEach(() => {
  testTask = {
    id: 'id10',
    title: 'TestTask',
    status: TaskStatuses.New,
    todoListId: 'id1',
    startDate: '',
    addedDate: '',
    deadline: '',
    order: 0,
    priority: TaskPriorities.Low,
    description: '',
  }

  startState = {
    id1: [
      {
        id: 'id1',
        title: 'HTML',
        status: TaskStatuses.Completed,
        todoListId: 'id1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: 'id2',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'id1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: 'id3',
        title: 'JS',
        status: TaskStatuses.New,
        todoListId: 'id1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
    id2: [
      {
        id: 'id1',
        title: 'Milk',
        status: TaskStatuses.Completed,
        todoListId: 'id2',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: 'id2',
        title: 'Cookie',
        status: TaskStatuses.Completed,
        todoListId: 'id2',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
  }
})

test('task should be added', () => {
  const endState = tasksReducer(startState, addTask({ task: testTask }))

  expect(endState.id1[0].title).toBe(testTask.title)
})

test('task should be removed', () => {
  const endState = tasksReducer(startState, removeTask({ todolistID: 'id1', taskID: 'id2' }))

  expect(endState.id1.length).toBe(2)
  expect(endState.id1[1].id).toBe('id3')
})

test('task status should be changed', () => {
  const updatedTask: TaskType = {
    id: 'id2',
    title: 'CSS',
    status: TaskStatuses.Completed,
    todoListId: 'id1',
    startDate: '',
    addedDate: '',
    deadline: '',
    order: 0,
    priority: TaskPriorities.Low,
    description: '',
  }
  const endState = tasksReducer(startState, updateTask({ task: updatedTask }))

  expect(endState.id1[1].status).toBe(TaskStatuses.Completed)
})

test('task title should be changed', () => {
  const newTaskTitle = 'React'
  const updatedTask: TaskType = {
    id: 'id2',
    title: newTaskTitle,
    status: TaskStatuses.Completed,
    todoListId: 'id1',
    startDate: '',
    addedDate: '',
    deadline: '',
    order: 0,
    priority: TaskPriorities.Low,
    description: '',
  }

  const endState = tasksReducer(startState, updateTask({ task: updatedTask }))

  expect(endState.id1[1].title).toBe(newTaskTitle)
})

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, removeTodolist({ todolistID: 'id1' }))

  expect(endState['id1']).toBeUndefined()
})
