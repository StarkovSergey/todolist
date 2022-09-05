import React from 'react'
import './App.css'
import { Container } from '@mui/material'
import { AppBarMUIComponent } from '../components/AppBar/AppBarMUIComponent'
import { TodolistsPage } from '../features/TodolistsPage/TodolistsPage'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'

function App() {
  return (
    <div className="App">
      <AppBarMUIComponent />
      <Container>
        <TodolistsPage />
      </Container>

      <ErrorSnackbar/>
    </div>
  )
}

export default App
