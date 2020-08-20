/* eslint-disable */

const router = require('express').Router();
const path = require('path');
const cards = path.join(__dirname, '..', 'data', 'cards.json');
const fs = require('fs').promises;

router.get('/cards', (req, res) => { //передаем карточки пользователей
  fs.readFile(cards, 'utf8')
    .then((data) => {
      res
        .status(200)
        .send(JSON.parse(data));
    })
    .catch(error => {
      res
        .status(500)
        .send('Error');
      console.log(error);
    })
});

module.exports = router;