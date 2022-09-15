import axios from 'axios'
import { Dispatch } from 'redux'

import { ResponseType } from '../api/todolist-api'
import { changeAppStatus, setAppError } from '../app/app-reducer'
import { changeTaskStatus } from '../features/TodolistsPage/tasks-reducer'
import { changeTodolistStatus } from '../features/TodolistsPage/todolists-reducer'

export const handleNetworkError = (dispatch: Dispatch, err: unknown, todolistID?: string, taskID?: string) => {
  if (axios.isAxiosError(err)) {
    dispatch(setAppError({ error: err.message }))
  }

  if (todolistID) {
    dispatch(changeTodolistStatus({ todolistID, status: 'failed' }))

    if (taskID) {
      dispatch(changeTaskStatus({ todolistID, taskID, entityStatus: 'failed' }))
    }
  } else {
    dispatch(changeAppStatus({ status: 'failed' }))
  }
}

export const handleAppError = <T>(dispatch: Dispatch, data: ResponseType<T>, todolistID?: string, taskID?: string) => {
  dispatch(setAppError({ error: data.messages[0] || 'some error occurred' }))

  if (todolistID) {
    dispatch(changeTodolistStatus({ todolistID, status: 'failed' }))

    if (taskID) {
      dispatch(changeTaskStatus({ todolistID, taskID, entityStatus: 'failed' }))
    }
  } else {
    dispatch(changeAppStatus({ status: 'failed' }))
  }
}
