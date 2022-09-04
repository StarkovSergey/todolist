import { todolistAPI, TodolistType } from '../../api/todolist-api'
import { AppThunk } from '../../app/store'
import { AppActionsType, setAppStatusAC } from '../../app/app-reducer'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: TodolistsActionsType
): TodolistDomainType[] => {
  switch (action.type) {
    case 'SET-TODOLISTS':
      return action.todolists.map((todolist) => ({ ...todolist, filter: 'all' }))
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((todolist) =>
        todolist.id === action.todolistID
          ? {
              ...todolist,
              filter: action.filter,
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
      return [{ ...action.todolist, filter: 'all' }, ...state]
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

// thunks
export const setTodolistsTC = (): AppThunk => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))

  const response = await todolistAPI.getTodolists()
  dispatch(setTodolistsAC(response.data))

  dispatch(setAppStatusAC('succeeded'))
}

export const removeTodolistTC = (todolistID: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    await todolistAPI.removeTodolist(todolistID)
    dispatch(removeTodolistAC(todolistID))

    dispatch(setAppStatusAC('succeeded'))
  }

export const addTodolistTC =
  (title: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    const response = await todolistAPI.addTodolist(title)
    dispatch(addTodolistAC(response.data.data.item))

    dispatch(setAppStatusAC('succeeded'))
  }
export const changeTodolistTitleTC =
  (todolistID: string, title: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    await todolistAPI.changeTodolistTitle(todolistID, title)
    dispatch(changeTodolistTitleAC(todolistID, title))

    dispatch(setAppStatusAC('succeeded'))
  }

// types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type removeTodolistAT = ReturnType<typeof removeTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type addTodolistAT = ReturnType<typeof addTodolistAC>
export type setTodolistsAT = ReturnType<typeof setTodolistsAC>

export type TodolistsActionsType =
  | changeTodolistFilterAT
  | removeTodolistAT
  | changeTodolistTitleAT
  | addTodolistAT
  | setTodolistsAT
