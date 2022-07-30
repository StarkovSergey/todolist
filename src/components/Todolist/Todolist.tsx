import { FilterType, TasksStateType, TaskType, TodolistType } from '../../App'
import { ChangeEvent } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { AddItemBox } from '../AddItemBox/AddItemBox'
import { Button, Checkbox, Grid, IconButton, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './Todolist.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from '../../redux/store'
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../../redux/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../redux/tasks-reducer'

type PropsType = {
  todolist: TodolistType
}

export function Todolist({todolist}: PropsType) {
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)
  const dispatch = useDispatch()

  let filteredTasks: TaskType[]

  switch (todolist.filter) {
    case 'active':
      filteredTasks = tasks[todolist.id].filter((task) => !task.isDone)
      break
    case 'completed':
      filteredTasks = tasks[todolist.id].filter((task) => task.isDone)
      break
    default:
      filteredTasks = tasks[todolist.id]
  }

  const changeTodolistFilter = (filter: FilterType) => {
    dispatch(changeTodolistFilterAC(todolist.id, filter))
  }

  const removeTodolist = () => {
    const action = removeTodolistAC(todolist.id)
    dispatch(action)
    dispatch(action)
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(todolist.id, title))
  }

  const addTask = (title: string) => {
    dispatch(addTaskAC(todolist.id, title))
  }

  const tasksElements = filteredTasks.map((task) => {
    const removeTask = () => {
      dispatch(removeTaskAC(todolist.id, task.id))
    }

    const checkboxTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(todolist.id, task.id, evt.currentTarget.checked))
    }

    const changeTaskTitle = (title: string) => {
      dispatch(changeTaskTitleAC(todolist.id, task.id, title))
    }

    return (
      <li key={task.id} className={style.item}>
        <Checkbox checked={task.isDone} onChange={checkboxTaskHandler} size={'small'} color="success" />
        <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
        <IconButton onClick={removeTask} size="small">
          <DeleteIcon />
        </IconButton>
      </li>
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
}
