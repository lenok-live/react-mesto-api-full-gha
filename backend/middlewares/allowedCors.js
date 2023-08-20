// // Массив доменов, с которых разрешены кросс-доменные запросы
// const allowedCors = [
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//   'localhost:3000',
// ];

// app.use(function(req, res, next) {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     res.header('Access-Control-Allow-Origin', origin);
//   }

//   next(); // Если источник запроса не найден среди разрешённых,
//          //пропускаем обработку запроса дальше без изменений заголовка ответа
// });

// ...
// const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

// // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
// const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
// // сохраняем список заголовков исходного запроса
// const requestHeaders = req.headers['access-control-request-headers'];
// // Если это предварительный запрос, добавляем нужные заголовки
// if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', requestHeaders);
//     return res.end();
// }
// ...

// module.exports = allowedCors;
