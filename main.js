class ProductsList {
	constructor(container = '.products'){
		this.container = container;
		this.goods = [];
		this._fetchProducts();
		this.basket = [];	// массив под корзину
	}

	_fetchProducts(){
		this.goods = [
			{id: 0, title: 'Ноутбук', price: 2000, img: 'Notebook'},
			{id: 1, title: 'Мышка', price: 20, img: 'Mouse'},
			{id: 2, title: 'Клавиатура', price: 200, img: 'Keyboard'},
			{id: 3, title: 'Гэймпад', price: 50, img: 'Gamepad'},
			{id: 4, title: 'Моноблок', price: 1000, img: 'Monoblock'},
			{id: 5, title: 'Аксессуары', price: 100, img: 'Accessories'}
		];
	}

	goodsSum(nameBlock){
		let goodsSum = 0;
		const blockName = document.querySelector(nameBlock);;
		for(let product of this.goods){
			goodsSum += product.price;
		}
		blockName.insertAdjacentHTML('afterbegin', `Сумма всех товаров: ${goodsSum}&#36;`);
	}

	render(){
		const block = document.querySelector(this.container);
		for(let product of this.goods){
			const productObj = new ProductItem(product);
			block.insertAdjacentHTML('beforeend', productObj.render());
		}
	}
	
	addItem(){
		// добавление товара для вывода на экран товара из корзины
	}

	deleteItem(){
		// удаление товара из корзины
	}


}
class ProductItem{
	constructor(product){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = product.img
	}

	render(){
		return 	`<div id=${this.id} class="product-item">
							<h3>${this.title}</h3>
							<img class="card-img" src="img/${this.img}.jpeg" alt="${this.img}">
							<p>Цена: ${this.price} &#36;</p>
							<button class="buy-btn">Купить</button>
						</div>`
	}
}

//Конструктор класса корзины товаров
//при выборе товара в корзину попадают данные по товару
//наследуем от родителя ProductItem поля и добавляем методы
class BasketGoods extends ProductItem{
	
	render(){

	}

}

let list = new ProductsList();
list.render();
list.goodsSum(".goodsSum");