const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');  //aca importamos nuestros routers.
const errorHandler = require('./utils/middlewares/errorHandler.js')
const setHeaders = require('./utils/middlewares/setHeaders.js')
require('./db.js');


const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //nos dpermite parsear nuestros json de forma correcta
server.use(bodyParser.json({ limit: '50mb' })); //para poder tomar json
server.use(cookieParser());
server.use(morgan('dev')); //da un ouput en la consola cada vez que hacemos un request
server.use(setHeaders);

server.use('/', routes);  //

// Error catching endware.
server.use(errorHandler);

module.exports = server;
