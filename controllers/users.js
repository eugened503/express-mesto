/* eslint-disable */

const User = require('../models/users');

module.exports.createUser = (req, res) => { //создать пользователя
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод создания профиля' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getIdUser = (req, res) => {  //получить пользователя по id
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then(user => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' })
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод получения профиля' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getAllUser = (req, res) => { //получить всех пользователей
  User.find({})
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: false, // если пользователь не найден, он не будет обновлен
  })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' })
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод обновления профиля' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => { //обновить аватар юзера
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' })
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод обновления аватара' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

