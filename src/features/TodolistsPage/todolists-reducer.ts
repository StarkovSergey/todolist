import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ResultCodes, todolistAPI, TodolistType } from '../../api/todolist-api'
import { changeAppStatus, RequestStatusType } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleAppError, handleNetworkError } from '../../utils/error-utils'

import { setTasksTC } from './tasks-reducer'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map(todolist => ({ ...todolist, filter: 'all', status: 'idle' }))
    },
    changeTodolistFilter(state, action: PayloadAction<{ todolistID: string; filter: FilterType }>) {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID
          ? {
              ...todolist,
              filter: action.payload.filter,
            }
          : todolist
      )
    },
    removeTodolist(state, action: PayloadAction<{ todolistID: string }>) {
      return state.filter(todolist => todolist.id !== action.payload.todolistID)
    },
    changeTodolistTitle(state, action: PayloadAction<{ todolistID: string; title: string }>) {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID ? { ...todolist, title: action.payload.title } : todolist
      )
    },
    addTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      return [{ ...action.payload.todolist, filter: 'all', status: 'idle' }, ...state]
    },
    changeTodolistStatus(state, action: PayloadAction<{ todolistID: string; status: RequestStatusType }>) {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID
          ? {
              ...todolist,
              status: action.payload.status,
            }
          : todolist
      )
    },
  },
})

export const todolistsReducer = slice.reducer

export const {
  changeTodolistStatus,
  addTodolist,
  changeTodolistTitle,
  removeTodolist,
  changeTodolistFilter,
  setTodolists,
} = slice.actions

// thunks
export const setTodolistsTC = (): AppThunk => async dispatch => {
  dispatch(changeAppStatus({ status: 'loading' }))

  try {
    const response = await todolistAPI.getTodolists()

    dispatch(setTodolists({ todolists: response.data }))
    dispatch(changeAppStatus({ status: 'succeeded' }))

    response.data.forEach(todolist => {
      dispatch(setTasksTC(todolist.id))
    })
  } catch (err) {
    handleNetworkError(dispatch, err)
  }
}

export const removeTodolistTC =
  (todolistID: string): AppThunk =>
  async dispatch => {
    dispatch(changeTodolistStatus({ todolistID, status: 'loading' }))

    try {
      const response = await todolistAPI.removeTodolist(todolistID)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(removeTodolist({ todolistID }))
        dispatch(changeTodolistStatus({ todolistID, status: 'succeeded' }))
      } else {
        handleAppError(dispatch, response.data, todolistID)
      }
    } catch (err) {
      handleNetworkError(dispatch, err)
    }
  }

export const addTodolistTC =
  (title: string): AppThunk =>
  async dispatch => {
    dispatch(changeAppStatus({ status: 'loading' }))

    try {
      const response = await todolistAPI.addTodolist(title)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(addTodolist({ todolist: response.data.data.item }))
        dispatch(changeAppStatus({ status: 'succeeded' }))
      } else {
        handleAppError(dispatch, response.data)
      }
    } catch (err) {
      handleNetworkError(dispatch, err)
    }
  }
export const changeTodolistTitleTC =
  (todolistID: string, title: string): AppThunk =>
  async dispatch => {
    dispatch(dispatch(changeTodolistStatus({ todolistID, status: 'loading' })))
    try {
      const response = await todolistAPI.changeTodolistTitle(todolistID, title)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(changeTodolistTitle({ todolistID, title }))
        dispatch(changeTodolistStatus({ todolistID, status: 'succeeded' }))
      } else {
        handleAppError(dispatch, response.data, todolistID)
      }
    } catch (e) {
      handleNetworkError(dispatch, e, todolistID)
    }
  }

// types
export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterType
  status: RequestStatusType
}
