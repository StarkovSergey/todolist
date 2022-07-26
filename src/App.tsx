import React, { useReducer, useState } from 'react'
import './App.css'
import { v1 } from 'uuid'
import { Todolist } from './components/Todolist/Todolist'
import { AddItemBox } from './components/AddItemBox/AddItemBox'
import { Container, Grid } from '@mui/material'
import { AppBarMUIComponent } from './components/AppBar/AppBarMUIComponent'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './redux/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './redux/tasks-reducer'

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
  const todolistID_1 = v1()
  const todolistID_2 = v1()

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
    { id: todolistID_1, title: 'What to learn', filter: 'all' },
    { id: todolistID_2, title: 'What to buy', filter: 'active' },
  ])

  const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [todolistID_1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todolistID_2]: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Cookie', isDone: true },
      { id: v1(), title: 'Book - "Hobbit"', isDone: true },
      { id: v1(), title: 'Ice Cream', isDone: false },
      { id: v1(), title: 'Juice', isDone: false },
    ],
  })


  const changeTodolistFilter = (todolistID: string, filter: FilterType) => {
    dispatchToTodolistsReducer(changeTodolistFilterAC(todolistID, filter))
  }

  const removeTodolist = (todolistID: string) => {
    const action = removeTodolistAC(todolistID)
    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
  }

  const changeTodolistTitle = (todolistID: string, title: string) => {
    dispatchToTodolistsReducer(changeTodolistTitleAC(todolistID, title))
  }

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)

    dispatchToTodolistsReducer(action)
    dispatchToTasksReducer(action)
  }

  const removeTask = (todolistID: string, taskID: string) => {
    dispatchToTasksReducer(removeTaskAC(todolistID, taskID))
  }

  const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
    dispatchToTasksReducer(changeTaskStatusAC(todolistID, taskID, isDone))
  }

  const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
    dispatchToTasksReducer(changeTaskTitleAC(todolistID, taskID, title))
  }

  const addTask = (todolistID: string, title: string) => {
    dispatchToTasksReducer(addTaskAC(todolistID, title))
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
