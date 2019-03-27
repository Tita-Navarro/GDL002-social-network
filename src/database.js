var database = firebase.database();

/////////////PARA LLENAR BASE DE DATOS DE WALL
/* const postTextFunction = () => {
    const postText = document.getElementById('postText').value;
    let firebasePostText = firebase.database().ref('F/post/post1').push().set(postText);
    return firebasePostText;
}
document.getElementById('submitBtn').addEventListener('click', ()=> postTextFunction());

///////////////PARA PINTAR DESDE BASE DE DATOS EN EL MURO
    var firebasewallText = firebase.database().ref('F/post/post1').child('-Lawzs8eMTaaJZKL2pcU');

    firebasewallText.on('value', function(snapshot){
        document.getElementById('wallPost').value = snapshot.val();
    });
 */
//Funcion para guardar la informacion de un usuario
let userId = "AyinjqsKT1M2x9Q5797yXr88Bu62"
let name = 'Paco'
let email = 'paco@gmail.com'
let imageUrl = 'www.img.com'

////funcion para llenar la rama 'users' de la base de datos
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
    });
  }

  writeUserData (userId, name, email, imageUrl); 



   
    //funcion para escribir un post nuevo base de datos user-post
    function writeNewPost(uid, username, picture, title, body) {
        // A post entry.
        var postData = {
        author: username,
        uid: uid,
        body: body,
        title: title,
        starCount: 0,
        authorPic: picture
        };

        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return firebase.database().ref().update(updates);
    }

    //FUNCION PARA CREAR EL CONTENIDO DE WALL/POST/BODY
    const createDataForPost = () => {
        let postText = document.getElementById('postText').value;

        //VARIABLES DE NEW POST
        let title = "some title"
        let body = postText;
        let picture = null;


        writeNewPost(userId, name, picture, title, body)
}
document.getElementById('submitBtn').addEventListener('click', ()=> createDataForPost());
