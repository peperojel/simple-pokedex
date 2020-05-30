import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import PokeCard from '../PokeCard/PokeCard'
import PokeDetails from '../PokeDetails/PokeDetails'
import PokePaginator from '../PokePaginator/PokePaginator'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  root2: {
    flexGrow: 1,
    minHeight: 500
  },
  paper: {
    height: 140,
    width: 85,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const PokeGrid = () => {
  const classes = useStyles();
  const spacing = 6;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [pokeToStage, setPokeToStage] = useState(0);
  const [page, setPage] = useState(1);
  const [pokeInstances, setPokeInstances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage(page)
  }, [page]);

  const showDetails = (id) => {
    setPokeToStage(Number(id));
    setDetailsOpen(true);
  };

  const hideDetails = () => {
    setDetailsOpen(false)
  }

  const changePage = (pageNum) => {
    setPage(pageNum)
  }

  const loadPage = async (pageNum) => {
    setLoading(true);
    try {
      const response = await fetch(`http://backend:3000/api/${pageNum}`);
      const respData = await response.json();
      setPokeInstances(respData);
    } catch (error) {
      console.log(error)
    }
    
    setLoading(false);
  }

  return (
    <div>
      <Container maxWidth="xl">
        <Grid container className={classes.root} spacing={2}>
          <Grid key={'pagination'} item xs={12}>
            <PokePaginator onPageChanged={changePage}/>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center" spacing={spacing} className={classes.root2}>
              {loading
                ? <Grid key='loader' item><CircularProgress color="secondary" /></Grid>
                : pokeInstances.map((pokeInstance) => (
                    <Grid key={pokeInstance.id} item>
                      <PokeCard pokeInstance={pokeInstance} onClickDetails={showDetails} />
                    </Grid>
                  ))
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>
      
      { detailsOpen &&
        <PokeDetails onCloseDetails={hideDetails} toStage={pokeToStage}/>
      }
    </div>
  );
};

export default PokeGrid;