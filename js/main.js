const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const App = {
    data: () => ({
      catalogUrl: '/catalogData.json',
      catalogBasket: '/getBasket.json',
      products: [],
      imgCatalog: 'https://placehold.it/200x150',
      imgGoods: 'https://placehold.it/50x100',
      userSearch: '',
      show: true,
      filtered: [],
      searchLine: '',
      isVisibleCart: 'invisible',
      goods: [],
      // all: []
    }),
    methods: {
      getJson(url){
        return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
      },
        addProduct(product){
          this.getJson(`${API}/addToBasket.json`)
            .then(data => {
              if(data.result === 1){
                let find = this.goods.find(el => el.id_product === product.id_product);
                if(find){
                  find.quantity++;
                }else{
                  const prod = Object.assign({quantity: 1}, product);
                  this.goods.push(prod);
                }
              }
            })
        },
        filter(){
          const regexp = new RegExp(this.searchLine, 'i');
          if (!this.searchLine){
            this.filtered = this.products;
          } else {
            this.filtered = this.filtered.filter (el => regexp.test(el.product_name));
          }

        },
        visibleCart() {
          if (this.isVisibleCart == 'invisible') {
            this.isVisibleCart = '';
          } else {
            this.isVisibleCart = 'invisible';
          }
        },
        removeGoods(item) {
          this.getJson(`${API}/addToBasket.json`)
            .then(data => {
              if (data.result === 1){
                if (item.quantity >1){
                  item.quantity--;
                }else{
                  this.goods.splice(this.goods.indexOf(item), 1)
                }
              }
            })
        }
    },
    computed:{
      calcSum(){
        return this.goods.reduce((accum, item) => accum += item.price * item.quantity, 0);
      }
    },
    mounted(){
      this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for(let el of data){
            this.products.push(el);
            this.filtered.push(el);
            }
          });
        this.getJson('getProducts.json')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);                    
                }
            });
        this.getJson(`${API + this.catalogBasket}`)
            .then(data => {
              this.goods = [...data.contents];
            })            
    }
}

Vue.createApp(App).mount('#app')