import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, Container } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppBarMUIComponent } from '../components/AppBar/AppBarMUIComponent'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { Page404 } from '../components/Page404/Page404'
import { Login } from '../features/Login/Login'
import { TodolistsPage } from '../features/TodolistsPage/TodolistsPage'

import { initializedAppTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'

type PropsType = {
  demo?: boolean
}

function App({ demo = false }: PropsType) {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(initializedAppTC())
  })

  if (!isInitialized) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size="200px" />
      </div>
    )
  }

  return (
    <div className="App">
      <AppBarMUIComponent />
      <Container>
        <Routes>
          <Route path="/" element={<TodolistsPage demo={demo} />} />
          <Route path="login" element={<Login />} />
          <Route path="404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </Container>
      <ErrorSnackbar />
    </div>
  )
}

export default App
