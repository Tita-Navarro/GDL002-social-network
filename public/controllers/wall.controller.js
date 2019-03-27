const wallController = (rawTpl, outlet) => {

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
    const createPost = () => {
        const postText = document.getElementById('postText').value;
        firebase.database().ref('/posts').push().set(
            { text: postText }
        );
    }


    //para que aparezca el mas reciente primero
    firebase.database().ref('/posts/').on('value', function(snapshot){
        const posts = Object.keys(snapshot.val())
            .map(key => snapshot.val()[key])
            .reverse();

        outlet.innerHTML = templateEngine(rawTpl, { posts });
        again();
    });
}