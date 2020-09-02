/* eslint-disable */

const User = require('../models/users');

module.exports.createUser = (req, res) => { //создать пользователя
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch((err) => {
      res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
    });
};

module.exports.getIdUser = (req, res) => {  //получить пользователя по id
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch((err) => {
      res.status(err.message ? 404 : 500).send({ message: 'Пользователь не найден' || 'На сервере произошла ошибка' });
    });
};

module.exports.getAllUser = (req, res) => { //получить всех пользователей
  User.find({})
    .then(user => res.send(user))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserInfo = (req, res) => { //обновить информацию юзера
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
    upsert: false, // если пользователь не найден, он не будет обновлен
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => { //обновить аватар юзера
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
    });
};