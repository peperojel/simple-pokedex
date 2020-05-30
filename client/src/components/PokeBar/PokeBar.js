import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

export default function PokeBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5" noWrap>
          <Box textAlign="center">
            Simple Pokedex!
          </Box>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
