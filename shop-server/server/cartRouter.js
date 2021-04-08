const express = require('express');
const fs = require('fs');
const handler = require('./handler'); //импортировали модуль handler - обработчик Корзины
const router = express.Router(); //активировали Router

router.get('/', (req, res) => { //на главной странице - '/'
  fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
  //считываем userCart.json, получаем данные data
    if(err){
      res.sendStatus(404, JSON.stringify({result:0, text: err}));
    } else {
      res.send(data); //отправляем в ответ данные data
    }
  })
});

router.post('/', (req, res) => { //post - добавление данных в Корзину
  handler(req, res, 'add', 'server/db/userCart.json');
  // *!* передаем параметры функции handler в файл handler.js (в строку 11)
});
router.put('/:id', (req, res) => { //put - изменение количества, '/:id' - get-параметр
  handler(req, res, 'change', 'server/db/userCart.json');
});
router.delete('/:id', (req, res) => {
  handler(req, res, 'delete', 'server/db/userCart.json');
});

module.exports = router;

//с помощью req получаем get-параметры (id)
//с помощью res отправляем ответ на сервер 