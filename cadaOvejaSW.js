var CACHE = 'sheepCouple';

// Cachea algunos recursos al instalarse.
self.addEventListener('install', function(evt) {
  console.log('El service worker está siendo instalado.');

  // Obliga al Service Worker a permanecer en el estado instalando hasta que la
  // promesa no haya sido devuelta.
  evt.waitUntil(precache());
});

// Cuando se produce un FETCH carga el recurso de la cache pero lo actualiza desde
// el servidor si está disponible.
self.addEventListener('fetch', function(evt) {
  console.log('El service worker está sirviendo el recurso.');
  // Tira del recurso de la caché para mostrar rápidamente la página.
  evt.respondWith(fromCache(evt.request));

  evt.waitUntil(update(evt.request));
});

// Abre una caché y usa el método addAll() con un array de recursos para añadirlos
// a la caché. Devuelve una promesa que se resuelve sólo cuando todos los recursos
// han sido añadidos a la caché.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      "./index.html",
      "./cadaOveja.css",
      "./jquery-3.1.1.min.js",
      "./js.cookie.js",
      "./cadaOveja.js",
      "./plugins/jquery.fireworks.js",
      "./plugins/jquery.confCadaOveja.js",
      "./images/startPulsado.png",
      "./images/lArrBl.png",
      "./images/rArrBl.png",
      "./images/lArrRed.png",
      "./images/rArrRed.png",
      "./images/start.png",
      "./images/close.png",
      "./images/botonNombre.jpg",
      "./images/botonGuardar.jpg",
      "./images/botonEsla.jpg",
      "./images/botonEslaOver.jpg",
      "./images/botonStar.jpg",
      "./images/botonStarOver.jpg", 
      "./images/stars.png",
      "./images/configuration.png",
      "./images/user.png",
      "./images/logout.png",
      "./images/muteGray.png",
      "./images/playinGray.png",
      "./images/tapete.jpg",
      "./images/reversos2.jpg",
      "./images/anversocarta.jpg",
      "./images/cartaacertada.jpg",
      "./images/burbOrange.png",
      "./images/burbBlue.png",
      "./images/burbOraRota.png",
      "./images/burbBlueRota.png",
      "./sonidos/kanonInD.mp3",
      "./sonidos/SappfireWind.mp3",
      "./sonidos/nightRadiance.mp3",
      "./sonidos/winterSmoke.mp3",
      "./sonidos/rainySun.mp3",
      "./sonidos/concerningHobbits.mp3",
      "./sonidos/click.mp3",
      "./sonidos/card-flip.mp3",
      "./sonidos/bubble.mp3",
      "./sonidos/dealing-card.mp3",
      "./sonidos/over.mp3"
    ]);
  });
}

// Abre la caché donde los recursos están almacenados y busca el recurso solicitado.
// En caso de no encontrarlo, devuelve una promesa con el valor "undefined".
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Hace una llamada a la red, abre la caché y almacena o actualiza los recursos
// de la caché con los recursos devueltos por la red.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response);
    });
  });
}
