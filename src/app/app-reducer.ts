import { AppThunk } from './store'
import { authAPI } from '../api/auth-api'
import { ResultCodes } from '../api/todolist-api'
import { setIsLoggedInAC } from '../features/Login/auth-reducer'
import { handleNetworkError } from '../utils/error-utils'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: AppStateType = {
  status: 'idle',
  error: null,
  isInitialized: false
}

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
  switch (action.type) {
    case 'APP/CHANGE-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-INITIALIZED':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

// actions
export const changeAppStatusAC = (status: RequestStatusType) => ({
  type: 'APP/CHANGE-STATUS' as const,
  status
})

export const setAppErrorAC = (error: string | null) => ({
  type: 'APP/SET-ERROR' as const,
  error
})

export const setInitializedAC = (value: boolean) => ({
  type: 'APP/SET-INITIALIZED' as const,
  isInitialized: value
})

// thunks
export const initializedAppTC = (): AppThunk => async (dispatch) => {
  try {
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedInAC(true))
    }
  } catch (e) {
    handleNetworkError(dispatch, e)
  } finally {
    dispatch(setInitializedAC(true))
  }
}

// types
export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}

export type AppActionsType =
  | ReturnType<typeof changeAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setInitializedAC>
