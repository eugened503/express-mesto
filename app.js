/* eslint-disable */

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public'))); //раздаем статические файлы

app.use('/', userRouter); // подключаем роутер с юзерами
app.use('/', cardRouter); // подключаем роутер с карточками

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})

app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' })); // ответ при запросе на несуществующий адрес

