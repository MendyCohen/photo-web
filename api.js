class Api {
  constructor(){
    this.baseUrl = 'http://localhost:3000/api/v1';
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
  fetchPosts() {
    return this.get(`${this.baseUrl}/pictures`)
  }

  get(url) {
    return fetch(url).then(res => res.json())
  }

  patch(url, body) {
    return fetch(url, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body),
    }).then(res => res.json());
  }

  updatePost(id, body) {
    return this.patch(`${this.baseUrl}/pictures/${id}`, body)
  }

  post(url, body){
    return fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(post => {
        console.log(post);
        //console.log(body);
       const divColumn = document.querySelector('.column')
       divColumn.innerHTML += new Post(post).renderListItem()
    })
  }

  createANewPost(body){
    return this.post(`${this.baseUrl}/pictures`, body)
  }

  // delete(url){
  //   return fetch(url, {
  //     method: 'DELETE'
  //   })
  // }
  //
  // deletePost(id){
  //   return this.delete(`${this.baseUrl}/pictures/${id}`)
  //   // debugger
  // }

  deletePost(id){
    return fetch(`${this.baseUrl}/pictures/${id}`, {
      method: 'DELETE'
    })
    // debugger
  }
}
