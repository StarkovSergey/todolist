import React from 'react'
import './App.css'
import { Container } from '@mui/material'
import { AppBarMUIComponent } from '../components/AppBar/AppBarMUIComponent'
import { TodolistsPage } from '../features/TodolistsPage/TodolistsPage'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

type PropsType = {
  demo?: boolean
}

function App({demo = false}: PropsType) {
  return (
    <div className="App">
      <AppBarMUIComponent />
      <Container>
        <TodolistsPage demo={demo}/>
      </Container>

      <ErrorSnackbar/>
    </div>
  )
}

export default App
