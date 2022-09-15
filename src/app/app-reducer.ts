import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authAPI } from '../api/auth-api'
import { ResultCodes } from '../api/todolist-api'
import { setIsLoggedIn } from '../features/Login/auth-reducer'
import { handleNetworkError } from '../utils/error-utils'

import { AppThunk } from './store'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: AppStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppError(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error
    },
    changeAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const { setAppError, changeAppStatus, setAppInitialized } = slice.actions

// thunks
export const initializedAppTC = (): AppThunk => async dispatch => {
  try {
    const response = await authAPI.me()

    if (response.data.resultCode === ResultCodes.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  } catch (e) {
    handleNetworkError(dispatch, e)
  } finally {
    dispatch(setAppInitialized({ isInitialized: true }))
  }
}

// types
export type AppStateType = {
  status: RequestStatusType
  error: null | string
  isInitialized: boolean
}
