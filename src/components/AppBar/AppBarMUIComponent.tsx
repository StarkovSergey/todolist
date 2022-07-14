import * as React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export function AppBarMUIComponent() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Typography variant="h6" component="b" sx={{ flexGrow: 1 }}>
          New Todolist
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
