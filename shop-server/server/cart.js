let add = (cart, req) => { //добавляем товары в корзину
  cart.contents.push(req.body);
  //обращаемся к массиву contents в файле cart.json, вставляем в верстку body
  //req.body - то, что приходит из нашего запроса
  return {name: req.body.product_name, newCart:JSON.stringify(cart, null, 4)};
  //преобразовываем объект в строку
};

let change = (cart, req) => { //изменяем товары в корзине
  let find = cart.contents.find(el => el.id_product === +req.params.id);
  //ищем по id наличие товаров в корзине
  find.quantity += req.body.quantity;
  return {name: find.product_name, newCart:JSON.stringify(cart, null, 4)};
};

let del = (cart, req) => { //удаляем товары в корзине
  let find = cart.contents.find(el => el.id_product === +req.params.id);
  cart.contents.splice(cart.contents.indexOf(find), 1);
  return {name: find.product_name, newCart:JSON.stringify(cart, null, 4)};
};

//экспортируем модули работы с корзиной
module.exports = {
  add,
  change,
  del
};