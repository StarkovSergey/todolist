import { AppThunk } from '../../app/store'
import { LoginParamsType, ResultCodes } from '../../api/todolist-api'
import { handleAppError, handleNetworkError } from '../../utils/error-utils'
import { changeAppStatusAC, setInitializedAC } from '../../app/app-reducer'
import { authAPI } from '../../api/auth-api'

const initialState = {
  isLoggedIn: false
}

type AuthStateType = typeof initialState

export const authReducer = (state: AuthStateType = initialState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case 'AUTH/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.value
      }
    default:
      return state
  }
}

// action creators
export const setIsLoggedInAC = (value: boolean) => ({
  type: 'AUTH/SET-IS-LOGGED-IN' as const,
  value
})

// thunks
export const loginTC = (loginParams: LoginParamsType): AppThunk => async (dispatch) => {
  dispatch(changeAppStatusAC('loading'))

  try {
    const response = await authAPI.login(loginParams)
    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedInAC(true))
      dispatch(changeAppStatusAC('succeeded'))
    } else {
      handleAppError(dispatch, response.data)
    }
  } catch (err) {
    handleNetworkError(dispatch, err)
  } finally {
    dispatch(setInitializedAC(true))
  }
}

export const logoutTC = (): AppThunk => async (dispatch) => {
  dispatch(changeAppStatusAC('loading'))

  try {
    const response = await authAPI.logout()

    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedInAC(false))
      dispatch(changeAppStatusAC('succeeded'))
    } else {
      handleAppError(dispatch, response.data)
    }
  } catch (err) {
    handleNetworkError(dispatch, err)
  }
}

// types
export type AuthActionsType =
  | ReturnType<typeof setIsLoggedInAC>
