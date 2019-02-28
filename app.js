class App {
  constructor(){
    this.api = new Api();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.createPosts = this.createPosts.bind(this);
    this.addPosts = this.addPosts.bind(this);
    this.createNewPost = this.createNewPost.bind(this)
    this.submitNewPost = this.submitNewPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }
  attachEventListeners(){
    document.querySelector('.column').addEventListener('click', this.handleEditClick);
    document.querySelector('#update').addEventListener('submit', this.handleSubmitForm);
    document.querySelector('#create-btn').addEventListener('click', this.createNewPost)
    document.querySelector('#create').addEventListener('submit', this.submitNewPost)
    document.querySelector('.column').addEventListener('click', this.deletePost)
  }
    createPosts(posts){
      posts.forEach(post => {
        new Post(post);
      });
      this.addPosts();
    }

    addPosts(){
      document.querySelector('.column').innerHTML = '';
      Post.all.forEach(
        post => (document.querySelector('.column').innerHTML += post.renderListItem())
      );
    }

    handleEditClick(e){
      if(e.target.className === 'edt-btn'){
        document.querySelector('#update').style.display = 'block';
        const id = parseInt(e.target.dataset.id);
        const post = Post.findById(id);
        document.querySelector('#update').innerHTML = post.renderUpdateForm();
      }
    }

    handleSubmitForm(e){
      e.preventDefault();
      const id = parseInt(e.target.querySelector('#hidden-field').dataset.id);
      const post = Post.findById(id);

      const title = e.target.querySelector('input').value;
      const image = e.target.querySelector('textarea').value;

      const bodyJSON = {title, image};
      //this.api.updatePost(post.id, bodyJSON) //.then(updatePost => console.log(updatePost));

      this.api.updatePost(post.id, bodyJSON).then(updatePost => {
        const post = Post.findById(updatePost.id);
        post.update(updatePost);
        this.addPosts();
        // debugger
      });
      document.querySelector('#update').style.display = 'none';
    }

    createNewPost(e){
      if(document.querySelector('#create').style.display === 'none'){
        document.querySelector('#create').style.display = 'block';
      } else {
        document.querySelector('#create').style.display = 'none';
      }
    }

    submitNewPost(e){
      e.preventDefault();
      //console.log(e);
      let title = e.target.querySelector('#title').value
      let image = e.target.querySelector('#image').value
      let photographer_id = parseInt(e.target.querySelector('#photographer').value)
      let category_id = parseInt(e.target.querySelector('#category').value)
      // debugger

      const bodyJSON = {photographer_id, category_id, title, image};
      this.api.createANewPost(bodyJSON)
      e.target.reset()
      document.querySelector('#create').style.display = 'none';
    }

    deletePost(e){
      if(e.target.className === 'dlt-btn'){
        this.api.deletePost(e.target.dataset.id)
        e.target.parentElement.remove()
      }
    }
}
