import style from '../Todolist.module.css'
import { Checkbox, CircularProgress, IconButton } from '@mui/material'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { ChangeEvent } from 'react'
import { removeTaskTC, TaskDomainType, updateTaskTC } from '../../tasks-reducer'
import { TaskStatuses } from '../../../../api/todolist-api'
import { useAppDispatch } from '../../../../app/store'

type PropsType = {
  task: TaskDomainType
  todolistID: string
}

export const Task = React.memo(({ task, todolistID }: PropsType) => {
  const dispatch = useAppDispatch()

  const removeTask = () => {
    dispatch(removeTaskTC(todolistID, task.id))
  }

  const checkboxTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskTC(todolistID, task.id, {
        status: evt.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      })
    )
  }

  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC(todolistID, task.id, { title }))
  }

  return (
    <li key={task.id} className={style.item}>
      {task.entityStatus === 'loading' && (
        <CircularProgress size={'15px'} color="secondary" sx={{ position: 'absolute', left: '-12px' }} />
      )}
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        onChange={checkboxTaskHandler}
        size={'small'}
        color="success"
        id={task.id}
        disabled={task.entityStatus === 'loading'}
      />
      <label style={{ width: '100%' }}>
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} disabled={task.entityStatus === 'loading'} />
      </label>
      <IconButton onClick={removeTask} size="small" disabled={task.entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </li>
  )
})
