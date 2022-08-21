import style from '../Todolist/Todolist.module.css'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { ChangeEvent } from 'react'
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../redux/tasks-reducer'
import { useDispatch } from 'react-redux'
import { TaskStatuses, TaskType } from '../../api/todolist-api'

type PropsType = {
  task: TaskType
  todolistID: string
}

export const Task = React.memo(({task, todolistID}: PropsType) => {
  const dispatch = useDispatch()

  const removeTask = () => {
    dispatch(removeTaskAC(todolistID, task.id))
  }

  const checkboxTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(todolistID, task.id, evt.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
  }

  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC(todolistID, task.id, title))
  }

  return (
    <li key={task.id} className={style.item}>
      <Checkbox checked={task.status === TaskStatuses.Completed} onChange={checkboxTaskHandler} size={'small'} color="success" id={task.id}/>
      <label htmlFor={task.id}>
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
      </label>
      <IconButton onClick={removeTask} size="small">
        <DeleteIcon />
      </IconButton>
    </li>
  )

})
