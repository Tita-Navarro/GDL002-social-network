//Funcion para registrar a los usuarios nuevos
function registrar(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('contrasena').value;

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
};

//Funcion para iniciar Sesion
function ingreso(){
    var email = document.getElementById('email2').value;
    var password = document.getElementById('contrasena2').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
     console.log('Estoy adentro de la sesion');    

};     
