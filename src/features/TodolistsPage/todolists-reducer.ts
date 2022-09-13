import { ResultCodes, todolistAPI, TodolistType } from '../../api/todolist-api'
import { AppThunk } from '../../app/store'
import { changeAppStatusAC, RequestStatusType } from '../../app/app-reducer'
import { handleAppError, handleNetworkError } from '../../utils/error-utils'
import { useEffect } from 'react'
import { setTasksTC } from './tasks-reducer'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: TodolistsActionsType
): TodolistDomainType[] => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.todolists.map((todolist) => ({ ...todolist, filter: 'all', status: 'idle' }))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((todolist) =>
        todolist.id === action.todolistID
          ? {
              ...todolist,
              filter: action.filter,
            }
          : todolist
      )
    case 'CHANGE-TODOLIST-STATUS':
      return state.map((todolist) =>
        todolist.id === action.todolistID
          ? {
              ...todolist,
              status: action.status,
            }
          : todolist
      )
    case 'REMOVE-TODOLIST':
      return state.filter((todolist) => todolist.id !== action.todolistID)
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((todolist) =>
        todolist.id === action.todolistID ? { ...todolist, title: action.title } : todolist
      )
    case 'ADD-TODOLIST':
      return [{ ...action.todolist, filter: 'all', status: 'idle' }, ...state]
    default:
      return state
  }
}

// actions
export const setTodolistsAC = (todolists: TodolistType[]) => ({
  type: 'SET-TODOLISTS' as const,
  todolists,
})

export const changeTodolistFilterAC = (todolistID: string, filter: FilterType) => ({
  type: 'CHANGE-TODOLIST-FILTER' as const,
  todolistID,
  filter,
})

export const removeTodolistAC = (todolistID: string) => ({
  type: 'REMOVE-TODOLIST' as const,
  todolistID,
})

export const changeTodolistTitleAC = (todolistID: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE' as const,
  todolistID,
  title,
})

export const addTodolistAC = (todolist: TodolistType) => ({
  type: 'ADD-TODOLIST' as const,
  todolist,
})

export const changeTodolistStatusAC = (todolistID: string, status: RequestStatusType) => ({
  type: 'CHANGE-TODOLIST-STATUS' as const,
  todolistID,
  status,
})

// thunks
export const setTodolistsTC = (): AppThunk => async (dispatch) => {
  dispatch(changeAppStatusAC('loading'))

  try {
    const response = await todolistAPI.getTodolists()
    dispatch(setTodolistsAC(response.data))
    dispatch(changeAppStatusAC('succeeded'))

    response.data.forEach((todolist) => {
      dispatch(setTasksTC(todolist.id))
    })
  } catch (err) {
    handleNetworkError(dispatch, err)
  }
}

export const removeTodolistTC =
  (todolistID: string): AppThunk =>
  async (dispatch) => {
    dispatch(changeTodolistStatusAC(todolistID, 'loading'))

    try {
      const response = await todolistAPI.removeTodolist(todolistID)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(removeTodolistAC(todolistID))
        dispatch(changeTodolistStatusAC(todolistID, 'succeeded'))
      } else {
        handleAppError(dispatch, response.data, todolistID)
      }
    } catch (err) {
      handleNetworkError(dispatch, err)
    }
  }

export const addTodolistTC =
  (title: string): AppThunk =>
  async (dispatch) => {
    dispatch(changeAppStatusAC('loading'))

    try {
      const response = await todolistAPI.addTodolist(title)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(addTodolistAC(response.data.data.item))
        dispatch(changeAppStatusAC('succeeded'))
      } else {
        handleAppError(dispatch, response.data)
      }
    } catch (err) {
      handleNetworkError(dispatch, err)
    }
  }
export const changeTodolistTitleTC =
  (todolistID: string, title: string): AppThunk =>
  async (dispatch) => {
    dispatch(changeTodolistStatusAC(todolistID, 'loading'))
    try {
      const response = await todolistAPI.changeTodolistTitle(todolistID, title)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(changeTodolistTitleAC(todolistID, title))
        dispatch(changeTodolistStatusAC(todolistID, 'succeeded'))
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

export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type setTodolistsAT = ReturnType<typeof setTodolistsAC>

export type TodolistsActionsType =
  | ReturnType<typeof changeTodolistFilterAC>
  | removeTodolistAT
  | ReturnType<typeof changeTodolistTitleAC>
  | addTodolistAT
  | setTodolistsAT
  | ReturnType<typeof changeTodolistStatusAC>
