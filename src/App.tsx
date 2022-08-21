import React from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { AddItemBox } from './components/AddItemBox/AddItemBox'
import { Container, Grid, Paper } from '@mui/material'
import { AppBarMUIComponent } from './components/AppBar/AppBarMUIComponent'
import {
  addTodolistAC,

} from './redux/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './redux/store'

export type FilterType = 'all' | 'active' | 'completed'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [id: string]: TaskType[]
}
export type TodolistType = {
  id: string
  title: string
  filter: 'all' | 'active' | 'completed'
}

function App() {
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)

    dispatch(action)
  }


  const todolistsComponents = todolists.map((todolist) => {

    return (
      <Grid item key={todolist.id}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <Todolist
            todolist={todolist}
            tasks={tasks[todolist.id]}
          />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className="App">
      <AppBarMUIComponent />
      <Container>
        <Grid container sx={{ padding: '20px 0' }}>
          <AddItemBox addItem={addTodolist} placeholder="Add new todolist" />
        </Grid>
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          {todolistsComponents}
        </Grid>
      </Container>
    </div>
  )
}

export default App
