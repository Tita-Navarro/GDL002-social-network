
//Funcion para registrar a los usuarios nuevos
const registerFunction = () => {
  var email = document.getElementById('emailRegister').value;
  var password = document.getElementById('passwordRegister').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () { //Función para verificar por correo electrónico a un usuario
      var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function () {
        // Email sent.
        window.alert('Se envió un email de verificación a tu correo electrónico\nFavor de verificarlo')
      }).catch(function (error) {
        // An error happened.
        window.alert('error : ' + error.message);
      });
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert('Ocurrió un error al iniciar registrarte \n\n' + 'Código de error: ' + errorCode + '\nMensaje: ' + errorMessage);
    });
};
document.getElementById('btnRegister').addEventListener('click', () => { registerFunction() });

//Función para comprobar el Estado del Usuario (Dentro o Fuera de la sesión)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("div-signin").style.display = "none";
    document.getElementById("div-register").style.display = "none";
    document.getElementById("plsVerify").style.display = "block";
    document.getElementById("div-user").style.display = "none";
    console.log(user)
    if(user.emailVerified != false){
      document.getElementById("div-signin").style.display = "none";
      document.getElementById("div-register").style.display = "none";
      document.getElementById("plsVerify").style.display = "none";
      document.getElementById("div-user").style.display = "block";
    }
  } else {
    // No user is signed in.
    document.getElementById("div-signin").style.display = "block";
    document.getElementById("div-register").style.display = "block";
    document.getElementById("plsVerify").style.display = "none";
    document.getElementById("div-user").style.display = "none";
  }
});
//Funcion para iniciar Sesion
const loginFunction = () => {
  var email = document.getElementById('emailLogin').value;
  var password = document.getElementById('passwordLogin').value;
  console.log('Estoy adentro de la sesion');

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert('Ocurrió un error al Iniciar Sesión \n\n' + 'Código de error: ' + errorCode + '\nMensaje: ' + errorMessage);
  });
};
document.getElementById('btnLogin').addEventListener('click', () => { loginFunction() });

//Función para Cerrar Sesión
const logoutFunction = () => {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
  console.log('Sali de la sesión');
}

document.getElementById('btnLogOut').addEventListener('click', () => { logoutFunction() });