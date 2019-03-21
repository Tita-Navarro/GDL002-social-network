//Funcion para registrar a los usuarios nuevos
const registerFunction = () => {
  var email = document.getElementById('emailRegister').value;
  var password = document.getElementById('paswordRegister').value;

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
};

document.getElementById('btnRegister').addEventListener('click', () => {registerFunction()});

//Funcion para iniciar Sesion
const loginFunction = () => {
  var email = document.getElementById('emailLogin').value;
  var password = document.getElementById('passwordLogin').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
   console.log('Estoy adentro de la sesion');    

};   
document.getElementById('btnLogin').addEventListener('click', () => {loginFunction()});

