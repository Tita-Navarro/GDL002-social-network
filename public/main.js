// configuration
Router.config({
  mode: 'history',
  outlet: document.getElementById('router-outlet')
}); //Extraido de la libreria literalmente

// returning the user to the initial state
Router.navigate(); //Extraido literal

// adding routes - // aqui debo agregar todas las partes que mostrará la pagina (login, wall, etc)
Router
.add(/wall/, {
  templateUrl: 'templates/wall.html',
  controller: wallController
})
.add(/login/, {
  templateUrl: 'templates/login.html',
  controller: loginController
})
.add(function() {
    console.log('default');
}).listen();


// Función para comprobar el Estado del Usuario (Dentro o Fuera de la sesión) // Para evitar entre al muro sin estar logeado
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    localStorage.setItem('loggedIn', user.email);  // localstorage: es una mini BD del navegador key:value - (Key, puede ser cualquier nombre, lo pongo yo)
    Router.navigate('/wall');
  } else {
    localStorage.removeItem('loggedIn');
    Router.navigate('/login');
  }
});
