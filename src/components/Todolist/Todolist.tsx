import { FilterType, TasksStateType, TaskType, TodolistType } from '../../App'
import React, { useCallback } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { AddItemBox } from '../AddItemBox/AddItemBox'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './Todolist.module.css'
import { useDispatch } from 'react-redux'
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../redux/todolists-reducer'
import { addTaskAC } from '../../redux/tasks-reducer'
import { Task } from '../Task/Task'

type PropsType = {
  todolist: TodolistType
  tasks: TaskType[]
}

export const Todolist = React.memo(({todolist, tasks}: PropsType) => {
  const dispatch = useDispatch()

  let filteredTasks: TaskType[]

  switch (todolist.filter) {
    case 'active':
      filteredTasks = tasks.filter((task) => !task.isDone)
      break
    case 'completed':
      filteredTasks = tasks.filter((task) => task.isDone)
      break
    default:
      filteredTasks = tasks
  }

  const changeTodolistFilter = useCallback((filter: FilterType) => {
    dispatch(changeTodolistFilterAC(todolist.id, filter))
  }, [dispatch, todolist.id])

  const removeTodolist = useCallback(() => {
    const action = removeTodolistAC(todolist.id)
    dispatch(action)
  }, [dispatch, todolist.id])

  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC(todolist.id, title))
  }, [dispatch, todolist.id])

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(todolist.id, title))
  }, [dispatch, todolist.id])

  const tasksElements = filteredTasks.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        todolistID={todolist.id}
      />
    )
  })

  return (
    <div>
      <h3 className={style.header}>
        <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle} />
        <IconButton onClick={removeTodolist} size="small">
          <DeleteIcon />
        </IconButton>
      </h3>
      <AddItemBox addItem={addTask} placeholder={'Add new task'} />
      <ul>{tasksElements}</ul>
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
