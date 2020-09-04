/* eslint-disable */

const Card = require('../models/cards');

module.exports.createCard = (req, res) => { //создаем карточку
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод создания карточки' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getAllCards = (req, res) => { //получаем все карточки
  Card.find({})
    .then(card => res.status(200).send(card))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => { //удаляем карточку по id
  Card.findById(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.status(200).send(card))
        .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' })
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод удаления карточки' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.putLike = (req, res) => { //ставим лайк карточке по id
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' })
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод добавления лайка' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteLike = (req, res) => { //удаляем лайк с карточки по id
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' })
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные в метод удаления лайка' })
        return;
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

