import { Provider } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import React from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from '../../index'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from '../../features/TodolistsPage/tasks-reducer'
import { todolistsReducer } from '../../features/TodolistsPage/todolists-reducer'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../../api/todolist-api'
import thunkMiddleware from 'redux-thunk'
import { appReducer } from '../../app/app-reducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, status: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, status: 'loading' },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        todoListId: '1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: '1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        todoListId: '1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: '1',
        startDate: '',
        addedDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
  },
  app: {
    status: 'idle',
    error: null,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return (
    <Provider store={storyBookStore}>
      <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
    </Provider>
  )
}
