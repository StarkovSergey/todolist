import * as React from 'react'
import { AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { logoutTC } from '../../features/Login/auth-reducer'

export const AppBarMUIComponent = React.memo(() => {
  const status = useAppSelector((state) => state.app.status)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="relative">
      <Toolbar>
        {/*<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Typography variant="h6" component="b" sx={{ flexGrow: 1 }}>
          Todolist
        </Typography>
        {isLoggedIn && (
          <Button color="secondary" variant="text" onClick={logout}>
            Sign out
          </Button>
        )}
      </Toolbar>
      {status === 'loading' && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: '-4px',
          }}
          color={'secondary'}
        />
      )}
    </AppBar>
  )
})
