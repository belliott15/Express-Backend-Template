const express = require('express');
//creates cookies with input data
const cookieParser = require('cookie-parser');
//logs morgan(':method :url :status :res[content-length] - :response-time ms')
const morgan = require('morgan');
const notFound = require('./middleware/not-found');
const error = require('./middleware/error');
const auth = require('./controllers/auth');
const monsters = require('./controllers/monsters');
const authenticate = require('./middleware/authenticate');

const app = express();

//Build in middleware
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
//converts data to json
app.use(express.json());
app.use(cookieParser());

//App Routes
app.use('/api/v1/users', auth);
app.use('/api/v1/monsters', authenticate, monsters);

//Error handling Middleware for issues with routes
app.use(notFound);
app.use(error);

module.exports = app;
