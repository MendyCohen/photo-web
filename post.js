  class Post {
    constructor(data){
      this.id = data.id;
      this.title = data.title;
      this.image = data.image;
      Post.all.push(this);
      // debugger
    }
    renderListItem(){
      return `<figure>
       <h3>${this.title}</h3>
       <img src="${this.image}"><br>
       <button class="edt-btn" data-id="${this.id}">Edit</button>
       <button class="dlt-btn" data-id="${this.id}">Delete</button>
      </figure>`;
    }
    static findById(id) {
      return this.all.find(post => post.id === id);
    }
    renderUpdateForm() {
      return `
      <form data-id=${this.id}>
        <label>Photo</label>
        <p>
          <input type="text" value="${this.title}" />
        </p>
        <label>Content</label>
        <p>
          <textarea>${this.image}</textarea>
        </p>
        <input id="hidden-field" type="hidden" data-id="${this.id}" name="hidden">
        <button type='submit'>Save Post</button>
      </form>
    `;
    }
    update({title, image}){
      this.title = title;
      this.image = image;
    }
  }
  Post.all = [];
