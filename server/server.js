const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();

const {allowCors} = require('./utils/cors')
const pokeRoutes = require('./routes/poke-routes')

app.use(bodyParser.json());

app.use(allowCors);

app.use('/api', pokeRoutes)

app.listen(3000);
