import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/Login/auth-reducer'
import { TasksActionsType, tasksReducer } from '../features/TodolistsPage/tasks-reducer'
import { TodolistsActionsType, todolistsReducer } from '../features/TodolistsPage/todolists-reducer'

import { AppActionsType, appReducer } from './app-reducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// hooks
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

// types
export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | AuthActionsType
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionsType>
