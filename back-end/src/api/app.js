const express = require('express');
require('express-async-errors');
const errorHandlerMiddleware = require('../middleware/errorHandlerMiddleware');
const loginRoute = require('../routes/loginRoutes');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandlerMiddleware);

module.exports = app;
