import React, { useCallback, useEffect } from 'react'
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan'
import { AddItemBox } from '../../../components/AddItemBox/AddItemBox'
import { Button, CircularProgress, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './Todolist.module.css'
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  FilterType,
  removeTodolistTC,
  TodolistDomainType,
} from '../todolists-reducer'
import { addTaskTC, setTasksTC, TaskDomainType } from '../tasks-reducer'
import { Task } from './Task/Task'
import { TaskStatuses } from '../../../api/todolist-api'
import { useAppDispatch } from '../../../app/store'

type PropsType = {
  todolist: TodolistDomainType
  tasks: TaskDomainType[]
  demo?: boolean
}

export const Todolist = React.memo(({ todolist, tasks, demo = false }: PropsType) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo) {
      return
    }

    dispatch(setTasksTC(todolist.id))
  }, [dispatch, todolist.id, demo])

  let filteredTasks: TaskDomainType[]
  switch (todolist.filter) {
    case 'active':
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.New)
      break
    case 'completed':
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.Completed)
      break
    default:
      filteredTasks = tasks
  }

  const changeTodolistFilter = useCallback(
    (filter: FilterType) => {
      dispatch(changeTodolistFilterAC(todolist.id, filter))
    },
    [dispatch, todolist.id]
  )

  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(todolist.id))
  }, [dispatch, todolist.id])

  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(changeTodolistTitleTC(todolist.id, title))
    },
    [dispatch, todolist.id]
  )

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolist.id, title))
    },
    [dispatch, todolist.id]
  )

  const tasksElements = filteredTasks.map((task) => {
    return <Task key={task.id} task={task} todolistID={todolist.id} />
  })

  return (
    <div className={style.todolist}>
      {todolist.status === 'loading' && (
        <CircularProgress size={'20px'} color="secondary" sx={{ position: 'absolute', right: '-12px', top: '-12px' }} />
      )}
      <h3 className={style.header}>
        <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle} disabled={todolist.status === 'loading'}/>
        <IconButton onClick={removeTodolist} size="small" disabled={todolist.status === 'loading'}>
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemBox addItem={addTask} placeholder={'Add new task'} disabled={todolist.status === 'loading'} />
      <ul className={style['tasks-list']}>{tasksElements}</ul>
      <div className={style['button-box']}>
        <Button
          onClick={() => changeTodolistFilter('all')}
          variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
          size="small">
          All
        </Button>
        <Button
          onClick={() => changeTodolistFilter('active')}
          variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
          size="small">
          Active
        </Button>
        <Button
          onClick={() => changeTodolistFilter('completed')}
          variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
          size="small">
          Completed
        </Button>
      </div>
    </div>
  )
})
