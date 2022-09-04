import { AppRootStateType, useAppDispatch } from '../../app/store'
import { useSelector } from 'react-redux'
import { addTodolistTC, setTodolistsTC, TodolistDomainType } from './todolists-reducer'
import { TasksStateType } from './tasks-reducer'
import React, { useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { Todolist } from './Todolist/Todolist'
import { AddItemBox } from '../../components/AddItemBox/AddItemBox'

export const TodolistsPage = () => {
  const dispatch = useAppDispatch()
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

  const addTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  useEffect(() => {
    dispatch(setTodolistsTC())
  }, [dispatch])

  const todolistsComponents = todolists.map((todolist) => {
    return (
      <Grid item key={todolist.id}>
        <Paper elevation={3} sx={{padding: '20px'}}>
          <Todolist todolist={todolist} tasks={tasks[todolist.id]}/>
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