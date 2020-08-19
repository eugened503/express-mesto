/* eslint-disable */

const router = require('express').Router();
const path = require('path');
const cards = path.join(__dirname, '..', 'data', 'cards.json');
const fs = require('fs');

router.get('/cards', (req, res) => { //передаем карточки
  fs.readFile(cards, function (err, data) {
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

module.exports = router;