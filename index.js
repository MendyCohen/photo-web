document.addEventListener('DOMContentLoaded', () => {

  let categories = document.querySelector('#category')
// debugger
  fetch('http://localhost:3000/api/v1/categories')
  .then(res => res.json())
  .then(cat => cat.forEach(category => {
    categories.innerHTML += `
    <option id="${category.id}">${category.id}</option>
    `
     // debugger
  }))

  document.querySelector('#create').style.display = 'none';

  const divColumn = document.querySelectorAll('.column')
  const pictures = Array.from(divColumn)

  const app = new App();
  app.attachEventListeners();
  app.api.fetchPosts().then(json => {
    json.forEach(post => {
      pictures[0].innerHTML += new Post(post).renderListItem()
    })
  })
});

//run this in the front end terminal to load your file
//json-server --watch db.json
