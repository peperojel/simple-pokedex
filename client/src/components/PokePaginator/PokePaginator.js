import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    '& > *': {
      marginTop: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}));

export default function PokePaginator(props) {
  const classes = useStyles();
  const numPages = 41;
  const {onPageChanged} = props;

  const changePageHandler = (_, page) => {
    onPageChanged(page)
  };

  return (
    <div className={classes.root}>
      <Pagination count={numPages} size="large" onChange={changePageHandler}/>
    </div>
  );
}