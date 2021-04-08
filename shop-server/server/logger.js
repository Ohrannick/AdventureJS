const moment = require('moment'); //импортировали модуль moment - для работы со временем
const fs = require('fs');         //импортировали модуль fs - для работы с файлами

const logger = (name, action) => {
  fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
    if(err){
      console.log('Can`t read file')
    } else {
      const stat = JSON.parse(data);
      stat.push({ //записываем время события, продукт и само событие в корзине
        time: moment().format('DD MMM YYYY, h:mm:ss a'),
        prod_name: name,
        action: action
      });
      fs.writeFile('server/db/stats.json', JSON.stringify(stat, null, 4), (err) => {
        if(err){
          console.log('Can`t write file')
        }
      })
    }
  })
};

module.exports = logger;