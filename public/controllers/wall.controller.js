const wallController = (rawTpl, outlet) => {

  const again = () => {
    document.getElementById('btnLogOut').addEventListener('click', () => logoutFunction());
    document.getElementById('publishBtn').addEventListener('click', () => createPost());
    const removeButtons = document.getElementsByClassName('removePost');
    for (const button of removeButtons) {
      button.addEventListener('click', (event) => removePost(event)); // creo q aqui puedo insertar el alert
    }
    const likeButtons = document.getElementsByClassName('likePost');
    for (const button of likeButtons) {
      button.addEventListener('click', (event) => countLikes(event));
    }
    const modButtons = document.getElementsByClassName('modPost');
      for(const button of modButtons) {
        button.addEventListener('click', (event)=> modPost(event));
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
    const postText = document.getElementById('postText').value; // obtiene el texto que el usuario ingresó en el input
    if (postText.length < 4) return; // condicion para que no deje publicar sin contenido // return para que termine ahí y no continue haciendo lo demás :) 
    firebase.database().ref('/posts').push().set(  //Referencia para acceder a la base de datos para que lleve nuestro postext
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

  //Contar los likes 
  const countLikes = (event) => {
    const likes = parseInt(event.target.dataset.likes, 10) + 1;
    const postId = event.target.dataset.id;

    firebase.database().ref(`/posts/${postId}`).update({ likes: likes });

  }
 //Modificar Post - text hi ok
  const modPost = (event) => {
  let button = event.target;
  button.innerHTML = 'Guardar'
  button.onclick = function () {
  const postText = document.getElementById('postText').value;
  const updateText = {text:postText}
  const postId = event.target.dataset.id;
  return firebase.database().ref(`/posts/${postId}`).update(updateText);
  }
}





  //para que aparezca el mas reciente primero
  firebase.database().ref('/posts/').on('value', function (snapshot) {
    let posts = snapshot.val();
    console.log(posts);

    if (!posts) { //Sino existe un post crea un array vacio para que no salga error que esta indefinido
      posts = []
    } else {  // 
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