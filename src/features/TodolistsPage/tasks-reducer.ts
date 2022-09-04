import { addTodolistAT, removeTodolistAT, setTodolistsAT } from './todolists-reducer'
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI } from '../../api/todolist-api'
import { AppThunk } from '../../app/store'
import { setAppStatusAC } from '../../app/app-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS':
      return {
        ...state,
        [action.todolistID]: action.tasks,
      }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter((task) => task.id !== action.taskID),
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.task.todoListId]: state[action.task.todoListId].map((task) =>
          task.id === action.task.id ? action.task : task
        ),
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolist.id]: [],
      }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state }
      delete stateCopy[action.todolistID]
      return stateCopy
    }
    case 'SET-TODOLISTS':
      const stateCopy = { ...state }
      action.todolists.forEach((todolist) => (stateCopy[todolist.id] = []))
      return stateCopy
    default:
      return state
  }
}

// actions
export const addTaskAC = (task: TaskType) => ({
  type: 'ADD-TASK' as const,
  task,
})
export const removeTaskAC = (todolistID: string, taskID: string) => ({
  type: 'REMOVE-TASK' as const,
  todolistID,
  taskID,
})
const setTasksAC = (todolistID: string, tasks: TaskType[]) => ({
  type: 'SET-TASKS' as const,
  todolistID,
  tasks,
})
export const updateTaskAC = (task: TaskType) => ({
  type: 'UPDATE-TASK' as const,
  task,
})

// thunks
export const setTasksTC =
  (todolistID: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    const response = await todolistAPI.getTasks(todolistID)
    dispatch(setTasksAC(todolistID, response.data.items))

    dispatch(setAppStatusAC('succeeded'))
  }
export const removeTaskTC =
  (todolistID: string, taskID: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    await todolistAPI.removeTask(todolistID, taskID)
    dispatch(removeTaskAC(todolistID, taskID))

    dispatch(setAppStatusAC('succeeded'))
  }
export const addTaskTC =
  (todolistID: string, title: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    const response = await todolistAPI.addTask(todolistID, title)
    dispatch(addTaskAC(response.data.data.item))

    dispatch(setAppStatusAC('succeeded'))
  }
export const updateTaskTC =
  (todolistID: string, taskID: string, model: updateTaskModel): AppThunk =>
  async (dispatch, getState) => {
    const task = getState().tasks[todolistID].find((task) => task.id === taskID)

    if (task) {
      dispatch(setAppStatusAC('loading'))

      const response = await todolistAPI.updateTask(todolistID, taskID, {
        title: task.title,
        status: task.status,
        description: task.description,
        deadline: task.deadline,
        priority: task.priority,
        startDate: task.startDate,
        ...model,
      })

      dispatch(updateTaskAC(response.data.data.item))

      dispatch(setAppStatusAC('succeeded'))
    }
  }

// types
export type TasksStateType = {
  [id: string]: TaskType[]
}

export type TasksActionsType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | addTodolistAT
  | removeTodolistAT
  | setTodolistsAT
  | ReturnType<typeof setTasksAC>

type updateTaskModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
