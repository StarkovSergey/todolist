import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ResultCodes, TaskPriorities, TaskStatuses, TaskType, todolistAPI, TodolistType } from '../../api/todolist-api'
import { RequestStatusType } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleAppError, handleNetworkError } from '../../utils/error-utils'

import { addTodolist, changeTodolistStatus, removeTodolist, setTodolists } from './todolists-reducer'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ task: TaskType }>) {
      return {
        ...state,
        [action.payload.task.todoListId]: [
          { ...action.payload.task, entityStatus: 'idle' },
          ...state[action.payload.task.todoListId],
        ],
      }
    },
    removeTask(state, action: PayloadAction<{ todolistID: string; taskID: string }>) {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(task => task.id !== action.payload.taskID),
      }
    },
    setTasks(state, action: PayloadAction<{ todolistID: string; tasks: TaskType[] }>) {
      return {
        ...state,
        [action.payload.todolistID]: action.payload.tasks.map(task => ({ ...task, entityStatus: 'idle' })),
      }
    },
    updateTask(state, action: PayloadAction<{ task: TaskType }>) {
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map(task =>
          task.id === action.payload.task.id
            ? {
                ...action.payload.task,
                entityStatus: 'idle',
              }
            : task
        ),
      }
    },
    changeTaskStatus(
      state,
      action: PayloadAction<{ todolistID: string; taskID: string; entityStatus: RequestStatusType }>
    ) {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(task =>
          task.id === action.payload.taskID
            ? {
                ...task,
                entityStatus: action.payload.entityStatus,
              }
            : task
        ),
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(addTodolist, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolist, (state, action) => {
      delete state[action.payload.todolistID]
    })
    builder.addCase(setTodolists, (state, action) => {
      action.payload.todolists.forEach(todolist => {
        state[todolist.id] = []
      })
    })
  },
})

export const tasksReducer = slice.reducer
export const { changeTaskStatus, updateTask, setTasks, removeTask, addTask } = slice.actions

// thunks
export const setTasksTC =
  (todolistID: string): AppThunk =>
  async dispatch => {
    dispatch(dispatch(changeTodolistStatus({ todolistID, status: 'loading' })))
    try {
      const response = await todolistAPI.getTasks(todolistID)

      dispatch(setTasks({ todolistID, tasks: response.data.items }))

      dispatch(changeTodolistStatus({ todolistID, status: 'succeeded' }))
    } catch (err) {
      handleNetworkError(dispatch, err, todolistID)
    }
  }

export const removeTaskTC =
  (todolistID: string, taskID: string): AppThunk =>
  async dispatch => {
    dispatch(changeTaskStatus({ todolistID, taskID, entityStatus: 'loading' }))

    try {
      const response = await todolistAPI.removeTask(todolistID, taskID)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(removeTask({ todolistID, taskID }))
        dispatch(changeTodolistStatus({ todolistID, status: 'succeeded' }))
      } else {
        handleAppError(dispatch, response.data, todolistID, taskID)
      }
    } catch (err) {
      handleNetworkError(dispatch, err, todolistID, taskID)
    }
  }

export const addTaskTC =
  (todolistID: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(dispatch(changeTodolistStatus({ todolistID, status: 'loading' })))

    try {
      const response = await todolistAPI.addTask(todolistID, title)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(addTask({ task: response.data.data.item }))
        dispatch(changeTodolistStatus({ todolistID, status: 'succeeded' }))
      } else {
        handleAppError(dispatch, response.data, todolistID)
      }
    } catch (err) {
      handleNetworkError(dispatch, err, todolistID)
    }
  }

export const updateTaskTC =
  (todolistID: string, taskID: string, model: updateTaskModel): AppThunk =>
  async (dispatch, getState) => {
    const task = getState().tasks[todolistID].find(task => task.id === taskID)

    if (task) {
      dispatch(changeTaskStatus({ todolistID, taskID, entityStatus: 'loading' }))

      try {
        const response = await todolistAPI.updateTask(todolistID, taskID, {
          title: task.title,
          status: task.status,
          description: task.description,
          deadline: task.deadline,
          priority: task.priority,
          startDate: task.startDate,
          ...model,
        })

        if (response.data.resultCode === ResultCodes.Success) {
          dispatch(updateTask({ task: response.data.data.item }))
        } else {
          handleAppError(dispatch, response.data, todolistID, taskID)
        }
      } catch (err) {
        handleNetworkError(dispatch, err, todolistID, taskID)
      }
    }
  }

// types
export type TasksStateType = {
  [id: string]: TaskDomainType[]
}

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

type updateTaskModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
