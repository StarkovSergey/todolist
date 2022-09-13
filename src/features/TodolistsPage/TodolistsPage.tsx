import { AppRootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import { useSelector } from 'react-redux'
import { addTodolistTC, setTodolistsTC, TodolistDomainType } from './todolists-reducer'
import { TasksStateType } from './tasks-reducer'
import React, { useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { Todolist } from './Todolist/Todolist'
import { AddItemBox } from '../../components/AddItemBox/AddItemBox'
import { Login } from '../Login/Login'

type PropsType = {
  demo?: boolean
}

export const TodolistsPage: React.FC<PropsType> = ({demo = false}) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector((state) => state.todolists)
  const tasks = useAppSelector((state) => state.tasks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(setTodolistsTC())
  }, [dispatch, isLoggedIn, demo])

  if (!isLoggedIn) {
    return <Login/>
  }

  const todolistsComponents = todolists.map((todolist) => {
    return (
      <Grid item key={todolist.id}>
        <Paper elevation={3} sx={{padding: '20px'}}>
          <Todolist todolist={todolist} tasks={tasks[todolist.id]} demo={demo}/>
        </Paper>
      </Grid>
    )
  })


  return (
    <>
      <Grid container sx={{padding: '20px 0'}}>
        <AddItemBox addItem={addTodolist} placeholder="Add new todolist"/>
      </Grid>
      <Grid container spacing={{xs: 2, sm: 4}}>
        {todolistsComponents}
      </Grid>
    </>
  )
}
