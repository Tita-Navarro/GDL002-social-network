// configuration
Router.config({ mode: 'history'});

// returning the user to the initial state
Router.navigate();

// adding routes - // aqui debo agregar todas las partes que mostrará la pagina (login, wall, etc)
Router
.add(/wall/, function() {
    console.log('wall');
    fetch('templates/wall.html')
    .then(function(response){
      return response.text();
    })
    .then(function(rawTpl) {
      const tpl = templateEngine(rawTpl, {posts: [{text: 'This is a test post'}, {text: 'This is another test post'}]});
      const outletEl = document.getElementById('router-outlet');
      outletEl.innerHTML=tpl;
      controllers.wall();
    });
})
.add(/login/, function() { //estamos aqui
  console.log('login');
  fetch('templates/login.html')
  .then(function(response){
    return response.text();
  })
  .then(function(rawTpl) {
    const tpl = templateEngine(rawTpl);
    const outletEl = document.getElementById('router-outlet');
    outletEl.innerHTML=tpl;
    controllers.login();
  });
})
.add(function() {
    console.log('default');
}).listen();

// Función para comprobar el Estado del Usuario (Dentro o Fuera de la sesión)
firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    localStorage.setItem('loggedIn', user.email);  // localstorage: es una mini BD del nav key:value
    Router.navigate('/wall');
  } else {
    localStorage.removeItem('loggedIn');
    Router.navigate('/login');
  }
});

if(localStorage.getItem('loggedIn')){
  Router.navigate('/wall');
} else {
  Router.navigate('/login');
}