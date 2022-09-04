import { applyMiddleware, combineReducers, createStore } from 'redux'
import { TodolistsActionsType, todolistsReducer } from '../features/TodolistsPage/todolists-reducer'
import { TasksActionsType, tasksReducer } from '../features/TodolistsPage/tasks-reducer'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export const useAppDispatch = () => useDispatch<AppDispatch>()

// types
type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
