import { v1 } from 'uuid'
import { addTodolistAT, removeTodolistAT } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api'

export type TasksStateType = {
  [id: string]: TaskType[]
}

type addTaskAT = ReturnType<typeof addTaskAC>
type removeTaskAT = ReturnType<typeof removeTaskAC>
type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionsType = addTaskAT | removeTaskAT | changeTaskStatusAT | changeTaskTitleAT | addTodolistAT | removeTodolistAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask: TaskType = {
        id: v1(),
        todoListId: action.todolistID,
        title: action.title,
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        order: 0,
        addedDate: '',
        deadline: '',
        startDate: '',
      }

      return {
        ...state,
        [action.todolistID]: [newTask, ...state[action.todolistID]],
      }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter((task) => task.id !== action.taskID),
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((task) =>
          task.id === action.taskID ? { ...task, status: action.status } : task
        ),
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].map((task) =>
          task.id === action.taskID
            ? {
                ...task,
                title: action.title,
              }
            : task
        ),
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.id]: [],
      }
    case 'REMOVE-TODOLIST':
      const stateCopy = {...state}
      delete stateCopy[action.todolistID]
      return stateCopy
    default:
      return state
  }
}

export const addTaskAC = (todolistID: string, title: string) => ({
  type: 'ADD-TASK' as const,
  todolistID,
  title,
})

export const removeTaskAC = (todolistID: string, taskID: string) => ({
  type: 'REMOVE-TASK' as const,
  todolistID,
  taskID,
})

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: number) => ({
  type: 'CHANGE-TASK-STATUS' as const,
  todolistID,
  taskID,
  status,
})

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => ({
  type: 'CHANGE-TASK-TITLE' as const,
  todolistID,
  taskID,
  title,
})
