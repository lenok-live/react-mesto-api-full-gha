const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
//
const cors = require('cors');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const limiter = require('./middlewares/rateLimit');

const errorMiddlewares = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

//
// const allowedCors = [
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//   'localhost:3000',
//   'localhost:3001',
// ];

//
// const corsOptions = {
//   origin: allowedCors,
//   optionsSuccessStatus: 200,
//   credentials: true,
// };

app.use(helmet());

//
app.use(cors('no-cors'));

app.use(limiter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json()); // преобразует входные данные JSON в переменные, доступные JS
app.use(bodyParser.urlencoded({ extended: true })); // преобразует запросы, закодированные в URL

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorMiddlewares); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
