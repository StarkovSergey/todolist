import * as React from 'react'
import { AppBar, Toolbar, Typography, Button, LinearProgress } from '@mui/material'
import { useAppSelector } from '../../app/store'

export const AppBarMUIComponent = React.memo(() => {
  const status = useAppSelector((state) => state.app.status)

  return (
    <AppBar position="relative">
      <Toolbar>
        {/*<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Typography variant="h6" component="b" sx={{ flexGrow: 1 }}>
          Todolist
        </Typography>
        <Button color="secondary" variant={'outlined'}>
          Login
        </Button>
      </Toolbar>
      {status === 'loading' && <LinearProgress sx={{position: "absolute", width: "100%", bottom: "-4px"}} color={"secondary"}/>}
    </AppBar>
  )
})
