import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavbarCustom() {
  const classes = useStyles();

  const handleSave = () => {
    alert('Save')
  }

  const handleClear = () => {
    alert('Clear')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            PCL Generate File
          </Typography>
          <Button color="inherit" onClick={handleSave}>Save</Button>
          <Button color="inherit" onClick={handleClear}>Clear</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
