import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 160,
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
});

const PokeCard = props => {
  const classes = useStyles();
  const {pokeInstance, onClickDetails} = props;

  const clickHandler = () => {
    onClickDetails(pokeInstance.id)
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={clickHandler}>
        <CardMedia className={classes.media}>
          <img src={pokeInstance.imgUrl} alt="recipe thumbnail"/>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" align='center'>
            {pokeInstance.name}
          </Typography>

          <Typography variant="subtitle2" >
          Weight: <Typography variant="body2" color="textSecondary"> {pokeInstance.weight} </Typography>
          </Typography>

          <Typography variant="subtitle2" >
            Type(s): 
              <Typography variant="body2" color="textSecondary" component="ul">
                {pokeInstance.types.map((type, i) => <li key={i}>{type}</li>)}
              </Typography>
          </Typography>

          <Typography variant="subtitle2" >
            Skills:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="ul">
              {pokeInstance.abilities.map((ab, i) => <li key={i}>{ab}</li>)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokeCard;
