import { changeTodolistStatusAC } from '../features/TodolistsPage/todolists-reducer'
import { changeAppStatusAC, setAppErrorAC } from '../app/app-reducer'
import { Dispatch } from 'redux'
import { ActionsType } from '../app/store'
import axios from 'axios'
import { ResponseType } from '../api/todolist-api'
import { changeTaskStatusAC } from '../features/TodolistsPage/tasks-reducer'

export const handleNetworkError = (dispatch: Dispatch<ActionsType>, err: unknown, todolistID?: string, taskID?: string) => {

  if (axios.isAxiosError(err)) {
    dispatch(setAppErrorAC(err.message))
  }

  if (todolistID) {
    dispatch(changeTodolistStatusAC(todolistID, 'failed'))

    if (taskID) {
      dispatch(changeTaskStatusAC(todolistID, taskID, 'failed'))
    }
  } else {
    dispatch(changeAppStatusAC('failed'))
  }
}

export const handleAppError = <T>(dispatch: Dispatch<ActionsType>, data: ResponseType<T>, todolistID?: string, taskID?: string) => {
  dispatch(setAppErrorAC(data.messages[0] || 'some error occurred'))

  if (todolistID) {
    dispatch(changeTodolistStatusAC(todolistID, 'failed'))

    if (taskID) {
      dispatch(changeTaskStatusAC(todolistID, taskID, 'failed'))
    }
  } else {
    dispatch(changeAppStatusAC('failed'))
  }
}
