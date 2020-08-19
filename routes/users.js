/* eslint-disable */

const router = require('express').Router(); // создадим express router
const path = require('path'); //подключаем модуль path
const users = path.join(__dirname, '..', 'data', 'users.json'); //импортируем данные из файла users.json
const fs = require('fs'); //подключаем модуль fs

router.get('/users', (req, res) => { //передаем список юзеров
  fs.readFile(users, function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ Error: err.message });
    } else {
      return res
        .status(200)
        .send(JSON.parse(data));
    }
  });
});

router.get('/users/:id', (req, res) => { //ищем юзера по id
  fs.readFile(users, function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ Error: err.message });
    } else {
      const currentUser = JSON.parse(data).find(user => user._id === req.params.id);
      if (currentUser) {
        return res
          .status(200)
          .send(currentUser);
      }
      return res
        .status(404)
        .send({
          message: 'Нет пользователя с таким ID'
        })
    }
  });
});

module.exports = router; // экспортируем express router