import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../../api/auth-api'
import { LoginParamsType, ResultCodes } from '../../api/todolist-api'
import { changeAppStatus, setAppInitialized } from '../../app/app-reducer'
import { AppThunk } from '../../app/store'
import { handleAppError, handleNetworkError } from '../../utils/error-utils'

const initialState = {
  isLoggedIn: false,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const authReducer = slice.reducer
export const { setIsLoggedIn } = slice.actions

// thunks
export const loginTC =
  (loginParams: LoginParamsType): AppThunk =>
  async dispatch => {
    dispatch(changeAppStatus({ status: 'loading' }))

    try {
      const response = await authAPI.login(loginParams)

      if (response.data.resultCode === ResultCodes.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(changeAppStatus({ status: 'succeeded' }))
      } else {
        handleAppError(dispatch, response.data)
      }
    } catch (err) {
      handleNetworkError(dispatch, err)
    } finally {
      dispatch(setAppInitialized({ isInitialized: true }))
    }
  }

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(changeAppStatus({ status: 'loading' }))

  try {
    const response = await authAPI.logout()

    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: false }))
      dispatch(changeAppStatus({ status: 'succeeded' }))
    } else {
      handleAppError(dispatch, response.data)
    }
  } catch (err) {
    handleNetworkError(dispatch, err)
  }
}
