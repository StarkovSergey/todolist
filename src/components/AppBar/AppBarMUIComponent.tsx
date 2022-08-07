import * as React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material'

export const AppBarMUIComponent = React.memo(() => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Typography variant="h6" component="b" sx={{ flexGrow: 1 }}>
          Todolist
        </Typography>
        <Button color="secondary" variant={"outlined"}>Login</Button>
      </Toolbar>
    </AppBar>
  );
})
