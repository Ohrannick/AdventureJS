const fs = require('fs');       //импортировали модуль fs
const cart = require('./cart'); //импортировали свой модуль cart - работа с корзиной
const logger = require('./logger'); //импортировали свой модуль logger - статистика работы с корзиной

const actions = {       //возможные действия
  add: cart.add,        //добавление товаров
  change: cart.change,  //изменение товаров
  delete: cart.del      //удаление товаров
};

let handler = (req, res, action, file) => { // *!* принимаем параметры функции handler из файла cartRouter.js (из стр.17-26) из базы - userCart.json
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      let {name, newCart} = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          logger(name, action);
          res.send('{"result": 1}'); 
          //возвращаем обновленную строку в файле userCart.json
        }
      });
    }
  })
};

module.exports = handler;