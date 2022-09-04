import React from 'react'
import './App.css'
import { Container } from '@mui/material'
import { AppBarMUIComponent } from '../components/AppBar/AppBarMUIComponent'
import { TodolistsPage } from '../features/TodolistsPage/TodolistsPage'

function App() {
  return (
    <div className="App">
      <AppBarMUIComponent />
      <Container>
        <TodolistsPage />
      </Container>
    </div>
  )
}

export default App
