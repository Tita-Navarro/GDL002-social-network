const wallController = (rawTpl, outlet) => {    

  const again = () => {
      document.getElementById('btnLogOut').addEventListener('click', () => logoutFunction());
      document.getElementById('publishBtn').addEventListener('click', () => createPost());
      const removeButtons = document.getElementsByClassName('removePost');
      for(const button of removeButtons) {
        button.addEventListener('click', (event)=> removePost(event));
    }
  }
 
  //Función para Cerrar Sesión
  const logoutFunction = () => {
      firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log('Sali de la sesión');
      }).catch(function (error) {
      // An error happened.
      console.log('Error al intentar salir de la sesión');
      });
  }    

  //creacion del post
  const createPost = () => {
      const postText = document.getElementById('postText').value;
      firebase.database().ref('/posts').push().set(
        {
            text: postText,
            likes: 0   //para q cree el campo likes
        }
      );
  }

  // eliminación del post
  const removePost = (event) => {
      const postId = event.target.dataset.id;
    firebase.database().ref(`/posts/${postId}`).remove();
  }


  //para que aparezca el mas reciente primero
  firebase.database().ref('/posts/').on('value', function(snapshot){
    let posts = snapshot.val();

    if(!posts) {
        posts = []
    } else {
        posts = Object.keys(posts)
        .map(key => {
            let post = posts[key]; // posts.xbyas56376d23bd76g4
            post.id = key;
            return post;
        })
        .reverse();
    }
      outlet.innerHTML = templateEngine(rawTpl, { posts });
      again();
  });
}