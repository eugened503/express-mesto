/* eslint-disable */

const Card = require('../models/cards');

module.exports.createCard = (req, res) => { //создаем карточку
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
    });
};

module.exports.getAllCards = (req, res) => { //получаем все карточки
  Card.find({})
    .then(card => res.send(card))
    .catch((err) => {
      res.status(err.message ? 400 : 500).send({ message: err.message || 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => { //удаляем карточку по id
  Card.findById(req.params.cardId)
    .then((card) => {
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send(card))
        .catch(err => res.status(500).send({ message: 'На сервере произошла ошибка' }));
    })
    .catch((err) => {
      res.status(err.message ? 404 : 500).send({ message: 'Карточка не найдена' || 'На сервере произошла ошибка' });
    });
};

module.exports.putLike = (req, res) => { //ставим лайк карточке по id
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteLike = (req, res) => { //удаляем лайк с карточки по id
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

