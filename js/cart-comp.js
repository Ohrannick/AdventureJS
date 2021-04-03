const cartItem = {
  props:['good','img'],
  template:
  `
  <div class="cart-item">
    <div class="product-bio">
      <img :src="img" alt="Some image">
      <div class="product-desc">
        <p class="product-title">{{ good.product_name }}</p>
        <p class="product-quantity">Quantity: {{ good.quantity }}</p>
        <p class="product-single-price">$ {{ good.price }} each</p>
      </div>
    </div>
    <div class="right-block">
      <p class="product-price">$ {{ good.quantity * good.price }}</p>
      <button class="del-btn" @click='$root.$refs.cart.removeGoods(good)'>&times;</button>
    </div>
  </div>
  `
}

const cart = {
  components: {cartItem},
  data () {
    return {
      catalogBasket: '/getBasket.json',
      imgGoods: 'https://placehold.it/50x100',
      basketShow: false,
      goods: []
    }
  },
  methods: {
    addProduct(product){
      this.$parent.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if(data.result === 1){
            let find = this.goods.find(el => el.id_product === product.id_product);
            if(find){
              find.quantity++;
            }else{
              const prod = Object.assign({quantity: 1}, product);
              this.goods.push(prod);
            }
          }else {
            console.log('Error may be')
          }
        })
    },
    removeGoods(item) {
      this.$parent.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1){
            if (item.quantity > 1){
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
  mounted() {
    this.$parent.getJson(`${API + this.catalogBasket}`)
      .then(data => {
        this.goods = [...data.contents];
      })     
  },
  template:
  `
  <div>
    <button class="btn-cart" type="button" @click="basketShow=!basketShow">Корзина</button>
    <div class="cart-block" v-show='basketShow'>
      <span v-if="!goods.length">Корзина пуста</span>
      <cartItem v-for='good in goods' :img='imgGoods' :good='good'></cartItem>
      <hr>
      <div class='all' v-if="goods.length">Итого в корзине: $ {{ calcSum }} </div>
    </div>
  </div>
  `
}

