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

