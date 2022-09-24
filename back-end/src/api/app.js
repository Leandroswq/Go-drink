const express = require('express');
const cors = require('cors');
require('express-async-errors');

const loginRouter = require('./router/LoginRouter');
const errorFunc = require('./middlewares/errorMiddleware');

const app = express();

// Envia arquivos stálticos, como por exemplo imagens
// fonts
// https://stackoverflow.com/questions/15309688/express-js-how-show-image
// https://expressjs.com/pt-br/api.html#express.static
app.use(express.static('public'));

app.use(express.json());
app.use(cors());
app.use('/login', loginRouter);

app.use(errorFunc);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
