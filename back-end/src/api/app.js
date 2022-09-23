const express = require('express');
require('express-async-errors');
const cors = require('cors');
const errorHandlerMiddleware = require('../middleware/errorHandlerMiddleware');
const loginRoute = require('../routes/loginRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/login', loginRoute);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorHandlerMiddleware);

module.exports = app;
