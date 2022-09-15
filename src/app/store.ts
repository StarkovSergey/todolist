import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/Login/auth-reducer'
import { tasksReducer } from '../features/TodolistsPage/tasks-reducer'
import { todolistsReducer } from '../features/TodolistsPage/todolists-reducer'

import { appReducer } from './app-reducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
})

// hooks
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

// types
// export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | AuthActionsType
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
