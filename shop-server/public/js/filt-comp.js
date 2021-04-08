const search = {
  template:
  `
  <form action="#" class="search-form" @submit.prevent = '$parent.$refs.products.filter($parent.searchLine)'>
    <input 
      type="text" 
      class="search-field" 
      v-model="$parent.searchLine"
    >
    <button class="btn-search fas" type="submit">&#128269</button>
  </form>  
  `
}

// @submit.prevent - отменяем стандартные действия
// $refs - свойство, которое ссылается на нашу верстку <products ref="products"></products>
// v-model="$parent.userSearch" - связь между версткой и компонентом userSearch: '' из главного файла - main.js
// Можно использовать свойство props - для доступа к внешним свойствам компонентов