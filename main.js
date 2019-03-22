//Objeto con instrucciones para firebase sobre como construir el vínculo de AUTENTICACIÓN al email
var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://yolandarib-4.github.io/GDL002-social-network/',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

//Funcion para registrar a los usuarios nuevos
const registerFunction = () => {
  const email = document.getElementById('emailRegister').value;
  const password = document.getElementById('paswordRegister').value;

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(function (error) {
      // Some error occurred, you can inspect the code: error.code
    });

};

document.getElementById('btnRegister').addEventListener('click', () => { registerFunction() });

//Funcion para iniciar Sesion
const loginFunction = () => {
  var email = document.getElementById('emailLogin').value;
  var password = document.getElementById('passwordLogin').value;
  console.log('Estoy adentro de la sesion');
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('errorCode:' + errorCode); // errorCode:auth/wrong-password
    console.log('errorMessage:' + errorMessage); //errorMessage:The password is invalid or the user does not have a password.
    // ...
  });

};
document.getElementById('btnLogin').addEventListener('click', () => { loginFunction() });

const logoutFunction = () => {
  firebase.auth().signOut().then(function () {
    console.log('Sali de la sesión');
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
}

document.getElementById('btnLogOut').addEventListener('click', () => { logoutFunction() });