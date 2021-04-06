const product = {
  props: ['product', 'img'],
  template:
  `
  <div class="product-item"
    <div class="desc">
      <img :src="img" alt="Some image" width="170" height="130">
      <h3>{{ product.product_name }}</h3>
      <p>{{ product.price }} $</p>
      <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
    </div>
  </div>
  `
}

const products = {
  components: {product},
  data() {
    return {
      products: [],
      filtered: []
    }
  },
  mounted(){
    this.$parent.getJson(`/api/products`)
    .then(data => {
      for(let el of data){
        el.img = `img/${el.product_name}.jpeg`;
        console.log(el.img);
        this.products.push(el);
        this.filtered.push(el);
        }
    });  
  },
  methods: {
    filter(val){
      const regexp = new RegExp(val, 'i');
      if (!val){
        this.filtered = this.products;
      } else {
        this.filtered = this.products.filter (el => regexp.test(el.product_name));
      }
    }    
  },
  template:
  `
  <div class="products">
    <product
    v-for="product of filtered"
    :img='product.img'
    :product='product'></product>
  </div>
  `
}