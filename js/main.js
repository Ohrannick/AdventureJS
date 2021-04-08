const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
  el: '#app',
  data: {
    searchLine: ''
  },
  components: {cart, products, search},
  methods:{
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    }
  }
})