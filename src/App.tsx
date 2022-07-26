import React, { useReducer, useState } from 'react'
import './App.css'
import { Todolist } from './components/Todolist/Todolist'
import { AddItemBox } from './components/AddItemBox/AddItemBox'
import { Container, Grid } from '@mui/material'
import { AppBarMUIComponent } from './components/AppBar/AppBarMUIComponent'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from './redux/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './redux/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './redux/store'

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
  const todolists = useSelector<AppRootState, TodolistType[]>((state) => state.todolists)
  const tasks = useSelector<AppRootState, TasksStateType>((state) => state.tasks)

  const changeTodolistFilter = (todolistID: string, filter: FilterType) => {
    dispatch(changeTodolistFilterAC(todolistID, filter))
  }

  const removeTodolist = (todolistID: string) => {
    const action = removeTodolistAC(todolistID)
    dispatch(action)
    dispatch(action)
  }

  const changeTodolistTitle = (todolistID: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistID, title))
  }

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)

    dispatch(action)
  }

  const removeTask = (todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(todolistID, taskID))
  }

  const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
    dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
  }

  const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, title))
  }

  const addTask = (todolistID: string, title: string) => {
    dispatch(addTaskAC(todolistID, title))
  }

  const todolistsComponents = todolists.map((todolist) => {
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

    return (
      <Todolist
        key={todolist.id}
        id={todolist.id}
        title={todolist.title}
        filter={todolist.filter}
        tasks={filteredTasks}
        removeTodolist={removeTodolist}
        changeTodolistFilter={changeTodolistFilter}
        changeTodolistTitle={changeTodolistTitle}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
        addTask={addTask}
      />
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
