/* eslint-disable */

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f4b7a5c166cd42c084fecb0' //  _id пользователя
  };
  next();
});
app.use('/users', userRouter); // подключаем роутер с юзерами
app.use('/cards', cardRouter); // подключаем роутер с карточками

app.use((req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' })); // ответ при запросе на несуществующий адрес
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})