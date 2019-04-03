
const wallController = (rawTpl, outlet) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
         const userId= user.uid;
    const again = () => {
        document.getElementById('btnLogOut').addEventListener('click', () => logoutFunction());
        document.getElementById('publishBtn').addEventListener('click', () => createPost());
    }

    //Función para Cerrar Sesión
    const logoutFunction = () => {
        firebase.auth().signOut().then(function () {
        // Sign-out successful.
        }).catch(function (error) {
        // An error happened.
        });
        console.log('Sali de la sesión');
    }

    //creacion del post
    console.log(userId);

    const createPost = () => {
        const postText = document.getElementById('postText').value;
        // A post entry.
        var postData = {
         /*  author: username, */
          uid: userId,
          body: postText,
        /*   title: title,
          starCount: 0,
          authorPic: picture */
        };
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + userId + '/' + newPostKey] = postData;
        return firebase.database().ref().update(updates);
      }

  // eliminación del post
  const removePost = (event) => {
    const postId = event.target.dataset.id;
    firebase.database().ref(`/posts/${postId}`).remove();
  }

        outlet.innerHTML = templateEngine(rawTpl, { posts });
        again();
    });
        }
      });

}