import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const AppBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: 'Asap, sans-serif',
    color: 'white',
    flexGrow: 1,
  },
}));

export default function AppHeader() {
  const classes = AppBarStyles();
  return (
    <Toolbar className="top-bar">
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon style={{ color: 'white' }} />
      </IconButton>
      <Typography align="right" variant="h5" className={classes.title}>
        Todo List
      </Typography>
      {/* <Button color="inherit">Login</Button> */}
    </Toolbar>
  );
}
