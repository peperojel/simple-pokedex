import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import './PokeDetails.css'; 

const useStyles = makeStyles({
  card: {
    width: 250,
    minHeight:200,
    borderRadius: 30
  },
  media: {
    height: 80,
    '& img': {
      marginLeft: "auto",
      marginRight: "auto",
      display: "block"
    }
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialog: {
    borderRadius: 30,
    minWidth: 300,
    minHeight: 300,
    alignContent: "center",
    justifyContent: "center"
  } 
});

const PokeDetailsCard = (props) => {
  const classes = useStyles();
  const pokeDetails = props.pokeDetails;

  return (
    <Card className={classes.card}>
        <CardMedia className={classes.media}>
          <img src={pokeDetails.imgUrl} alt="recipe thumbnail"/>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" align='center'>
            {pokeDetails.name}
          </Typography>

          <Typography variant="subtitle2" >
          Weight: <Typography variant="body2" color="textSecondary"> {pokeDetails.weight} </Typography>
          </Typography>

          <Typography variant="subtitle2" >
            Type(s): 
              <Typography variant="body2" color="textSecondary" component="ul">
                {pokeDetails.types.map((type, i) => <li key={i}>{type}</li>)}
              </Typography>
          </Typography>

          <Typography variant="subtitle2" >
            Skills:
              <Typography variant="body2" color="textSecondary" component="ul">
                {pokeDetails.abilities.map((ab, i) => <li key={i}>{ab}</li>)}
              </Typography>
          </Typography>
        
        { pokeDetails.hasOwnProperty('description') &&
          <Typography variant="subtitle2" >
          Description: 
            <Typography variant="body2" color="textSecondary">
              <Box fontStyle="italic">
                {pokeDetails.description}
              </Box> 
            </Typography>
          </Typography>
        }
        </CardContent>
    </Card>
  );
};


function PokeDetailsStage(props) {
  const classes = useStyles();
  const {onClose, toStage} = props;

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({})
  // Ver como poder indicarle que pokemon cargar

  useEffect(() => {
    loadContent()
  },[]);

  const loadContent = async (pageNum) => {
    setLoading(true);
    const response = await fetch(`http://backend:3000/api/details/${toStage}`);
    const respData = await response.json();
    setContent(respData);
    setLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true} className={classes.dialog}>
      { loading
      ?
        <Card className={classes.card}>
          <CardContent>
            <div className="loader">
              <CircularProgress color="primary" />
            </div>
          </CardContent>
        </Card>
      : <PokeDetailsCard pokeDetails={content}/>
      }
    </Dialog>
  );
};

PokeDetailsStage.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default function PokeDetails(props) {
  const {onCloseDetails, toStage} = props;

  return (
    <div>
      <PokeDetailsStage onClose={onCloseDetails} toStage={toStage}/>
    </div>
  );
}