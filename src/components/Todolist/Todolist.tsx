import { FilterType, TaskType } from '../../App'
import { ChangeEvent } from 'react'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { AddItemBox } from '../AddItemBox/AddItemBox'
import { Button, Checkbox, Grid, IconButton, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import style from './Todolist.module.css'

type PropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: FilterType
  removeTodolist: (todolistID: string) => void
  changeTodolistFilter: (todolistID: string, filter: FilterType) => void
  changeTodolistTitle: (todolistID: string, title: string) => void
  removeTask: (todolistID: string, taskID: string) => void
  changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void
  changeTaskTitle: (todolistID: string, taskID: string, title: string) => void
  addTask: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {
  const tasksElements = props.tasks.map((task) => {
    const removeTask = () => {
      props.removeTask(props.id, task.id)
    }

    const checkboxTaskHandler = (evt: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(props.id, task.id, evt.currentTarget.checked)
    }

    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(props.id, task.id, title)
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

  const addTask = (title: string) => {
    props.addTask(props.id, title)
  }

  const changeTodolistFilter = (filter: FilterType) => {
    props.changeTodolistFilter(props.id, filter)
  }

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title)
  }

  return (
    <Grid item>
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <div>
          <h3 className={style.header}>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} size="small">
              <DeleteIcon />
            </IconButton>
          </h3>
          <AddItemBox addItem={addTask} placeholder={'Add new task'} />
          <ul>{tasksElements}</ul>
          <div className={style['button-box']}>
            <Button
              onClick={() => changeTodolistFilter('all')}
              variant={props.filter === 'all' ? 'contained' : 'outlined'}
              size="small">
              All
            </Button>
            <Button
              onClick={() => changeTodolistFilter('active')}
              variant={props.filter === 'active' ? 'contained' : 'outlined'}
              size="small">
              Active
            </Button>
            <Button
              onClick={() => changeTodolistFilter('completed')}
              variant={props.filter === 'completed' ? 'contained' : 'outlined'}
              size="small">
              Completed
            </Button>
          </div>
        </div>
      </Paper>
    </Grid>
  )
}
