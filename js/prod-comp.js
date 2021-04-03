const product = {
  props: ['img', 'product'],
  template:
  `
  <div class="product-item"
    <div class="desc">
      <img :src="img" alt="Some img">
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
      catalogUrl: '/catalogData.json',
      products: [],
      filtered: [],
      imgCatalog: 'https://placehold.it/200x150'
    }
  },
  mounted(){
    this.$parent.getJson(`${API + this.catalogUrl}`)
    .then(data => {
      for(let el of data){
        this.products.push(el);
        this.filtered.push(el);
        }
    });
    this.$parent.getJson('getProducts.json')
      .then(data => {
        for(let el of data){
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
    :img='imgCatalog'
    :product='product'></product>
  </div>
  `
}