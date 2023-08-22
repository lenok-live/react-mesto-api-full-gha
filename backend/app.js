const express = require('express');

const mongoose = require('mongoose');

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
const allowedCors = [
  'https://mesto.sultanova.nomoreparties.co',
  'http://mesto.sultanova.nomoreparties.co',
  'localhost:3000',
];

//
const corsOptions = {
  'Access-Control-Allow-Origin': allowedCors,
  credentials: true,
};

app.use(helmet());
app.use(limiter);
//
app.use(cors(corsOptions));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json()); // преобразует входные данные JSON в переменные, доступные JS
app.use(express.urlencoded({ extended: true })); // преобразует запросы, закодированные в URL

app.use(requestLogger); // подключаем логгер запросов до всех обработчиков роутов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(errorMiddlewares); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
