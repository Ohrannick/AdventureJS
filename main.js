const PRODUCTS = [
    { id: 0, title: 'Ноутбук', price: 2000, img: 'Notebook' },
    { id: 1, title: 'Мышка', price: 20, img: 'Mouse' },
    { id: 2, title: 'Клавиатура', price: 200, img: 'Keyboard' },
    { id: 3, title: 'Гэймпад', price: 50, img: 'Gamepad' },
    { id: 4, title: 'Моноблок', price: 1000, img: 'Monoblock' },
    { id: 5, title: 'Аксессуары', price: 100, img: 'Accessories' }
];
//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div id=${item.id} class="product-item">
                <h3>${item.title}</h3>
                <img class="card-img" src="img/${item.img}.jpeg" alt="${item.img}">
                <p>Цена: ${item.price} &#36;</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(PRODUCTS);