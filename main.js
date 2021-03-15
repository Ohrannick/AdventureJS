const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
	constructor(container = '.products'){
		this.container = container;
		this.goods = [];					//массив товаров из каталога JSON
		this.allProducts = [];		//массив объектов
    this._getProducts()
        .then(data => { //data - объект js
          this.goods = [...data];
          this.render()
        });		
	}

	_getProducts(){
			return fetch(`${API}/catalogData.json`)
					.then(result => result.json())
					.catch(error => {
							console.log(error);
					})
	}

	calcSum(){
		return this.allProducts.reduce((accum, item) => accum += item.price, 0);
	}

	render(){
		const block = document.querySelector(this.container);
		for(let product of this.goods){
			const productObj = new ProductItem(product);
			this.allProducts.push(productObj);
			block.insertAdjacentHTML('beforeend', productObj.render());
		}
	}
}


class ProductItem{
	constructor(product, img = 'https://placehold.it/200x150'){
		this.title = product.product_name;
		this.price = product.price;
		this.id = product.id_product;
		// this.img = product.img
		this.img = img;
	}

	render(){
		return 	`<div data-id=${this.id} class="product-item">
							<h3>${this.title}</h3>
							<img class="card-img" src="${this.img}" alt="Some img">
							<p>Цена: ${this.price} &#36;</p>
							<button class="buy-btn">Купить</button>
						</div>`
	}
}


//Конструктор класса списка товаров корзины. Добавляем свойство количество
class BasketsList {
		constructor(container = '.baskets'){
        this.container = container;
        this.baskets = [];		//массив товаров в корзине из каталога JSON
        this.allBaskets = [];	//массив объектов в корзине
        this._getBaskets()
						.then(data => {
							this.baskets = [...data.contents];
							this.render()
						})

    }

		calcSum(){
			return this.allBaskets.reduce((accum, item) => accum += item.price, 0);
    }

		calcNum(){
			return this.allBaskets.reduce((accum, item) => accum += item.quantity, 0);
    }		

		_getBaskets(){
		return fetch(`${API}/getBasket.json`)
				.then(result => result.json())
				.catch(error => {
						console.log(error);
				})
		}

    render(){
        const block = document.querySelector(this.container);
        for (let basket of this.baskets){
            const basketObj = new BasketItem(basket);
            this.allBaskets.push(basketObj);
            block.insertAdjacentHTML('beforeend', basketObj.render());
        }

    }

		addList(){						// добавление товара в корзину

		}

		deleteList(){			// удаление товара из корзины

		}

}

//Конструктор класса элемент корзины товаров
class BasketItem {
		constructor(basket){
			this.title = basket.product_name;
			this.price = basket.price;
			this.id = basket.id_product;
			this.quantity = basket.quantity;
		}
		
		render(){
			return `<div class="basket-item" data-id="${this.id}">
									<h3>${this.title}</h3> - 
									<p>${this.price} $</p> =>>  
									<button class="del-btn">Удалить из корзины</button>
					</div>`
    }
}

let list = new ProductsList();
let basket = new BasketsList();

window.onload = () => {
		document.getElementById("calcSum").addEventListener('click', () => {
			let calcSum = list.calcSum();
			let blockName = document.querySelector(".goodsSum");
			blockName.insertAdjacentHTML('beforeend', ` ${calcSum} &#36;`);
			// console.log(basket.calcSum());
			// console.log(basket.calcNum());
		});
}