const cartItem = {
  props:['good', 'img'],
  template:
  `
  <div class="cart-item">
    <div class="product-bio">
      <img :src="img" alt="Some image" width="100" height="75">
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
      basketShow: false,
      goods: []
    }
  },
  methods: {
    addProduct(product){
      let find = this.goods.find(el => el.id_product === product.id_product);
      if (find) {
        this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result === 1) {
              find.quantity++;
            }
          })
      } else {
      const prod = Object.assign({quantity: 1}, product);
      this.$parent.postJson(`/api/cart`, prod)
        .then(data => {
          if (data.result === 1) {
            this.goods.push(prod);
          }
        })
      }
    },
    removeGoods(item) {
      if(item.quantity > 1) {
        this.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
          .then(data => {
            if(data.result === 1) {
              item.quantity--;
            }
          })
      } else {
        this.$parent.deleteJson(`/api/cart/${item.id_product}`)
          .then(data => {
            if(data.result === 1){
              this.goods.splice(this.goods.indexOf(item), 1)
            }
          })
      }
    }
  },
  computed:{
    calcSum(){
      return this.goods.reduce((accum, item) => accum += item.price * item.quantity, 0);
    }
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let el of data.contents) {
          el.img = `img/${el.product_name}.jpeg`
          this.goods.push(el);
        }
      });
  },
  template:
  `
  <div>
    <button class="btn-cart" type="button" @click="basketShow=!basketShow">Корзина</button>
    <div class="cart-block" v-show='basketShow'>
      <span v-if="!goods.length">Корзина пуста</span>
      <cartItem v-for='good in goods' :img='good.img' :good='good'></cartItem>
      <hr>
      <div class='all' v-if="goods.length">Итого в корзине: $ {{ calcSum }} </div>
    </div>
  </div>
  `
}

