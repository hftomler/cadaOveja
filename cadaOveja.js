var numCartas = 24; // Número par
var cartasPorFila = 8; // Debe ser divisor exacto de numCartas para que sea simétrico.
var enJuego = false;
var mensajeInicio = "<br/><br/>¡ Sheep Couples ! <br/><br/>Insert coin<br/><br/><img src='images/coin.gif' width='90px' /><br/><br/>press 'S' to play again"
var mensajeGameOver = "<br/><br/>¡ CONGRATULATIONS ! <br/><br/>Insert coin<br/><br/><img src='images/coin.gif' width='90px' /><br/><br/>press 'S' to play again"
var mensajeFooter = "&copy; Agustín Lorenzo " + new Date().getFullYear() + " <a href='https://github.com/hftomler'>github -> hftomler </a>";
var muestraInicio = false; // False si no se quiere barrido al principio
var arrCartas = [];
var valorMaxCarta = 12;
var cartaAnterior = null;
var intentos = 0;
var posX = 0; // Posición x del ratón. Para mostrar burbujas puntuación.
var poxY = 0; // Posición y del ratón. Para mostrar burbujas puntuación.
var tiempoFuegos = 8000; // Tiempo (ms) duran los fuegos art. finales
var tiempoMuestraCarta = 500; // Tiempos en milisegundos que se muestra la carta

Array.prototype.barajar = function() {
  for ( var i = this.length-1; i > 0; i-- ) {
      var j = Math.floor( i * Math.random());
      var tmp = this[j];
      this[j] = this[i];
      this[i] = tmp;
  }
   return this;
};

function arrayCartas() {
  // Crear array con los números de cartas;
  for (var i = 0; i<(numCartas/2); i++) {
    var valor = Math.ceil(Math.random()*valorMaxCarta);
    // Si el valor no existe lo añado, si existe vuelvo a intentarlo
    if (arrCartas.indexOf(valor) == -1) {
      arrCartas.push(valor);// Añado la carta
      arrCartas.push(valor);// La duplico
    } else {
      i--; // Si la carta ya existía, vuelvo a generar otra.
    }
  }
  arrCartas.barajar();
}

$(document).ready (function () {
  crearTablero(); // Muestro el tablero por primera vez
  
  // Si se pulsa la imagen Start o la tecla S, comienza el juego
  $("#start").on({
    click: function() {
      crearTablero(); // Limpio el tablero y muestro cartas.
      enJuego = true;
      $(this).attr("src", "images/startPulsado.png");
    }
  })
  $(document).keydown(function(event){
    if ((event.key).toUpperCase() == "S" ) {
      crearTablero(); // Limpio el tablero y muestro cartas.
      enJuego = true;
      $("#start").attr("src", "images/startPulsado.png");
    }
  });
});

/*
// Se indica visualmente donde hacer clic para comenzar. muestraInicio = true
function pistaIniciar() {
  if (!($("#leftStart").is("img"))) { // Evito duplicar flechas
    var sup = $("#startSup");
    var inf = $("#startInf");
    inf.text("Haz clic en el botón o pulsa 'S'");
    atributos = {
      id: "leftStart",
      src: "images/lArrBl.png",
      title: "Haz clic Botón para Iniciar"
    };
    var fleIzq = $("<img/>");
    fleIzq.attr(atributos);
    sup.prepend(fleIzq);
    atributos = {
      id: "rightStart",
      src: "images/rArrBl.png",
      title: "Haz clic Botón para Iniciar"
    };
    var fleDer = $("<img/>");
    fleDer.attr(atributos);
    sup.append(fleDer);
    fleIzq.animate({
      marginRight: "1px"
    }, 1000, function () {
                fleIzq.attr("src", "images/lArrRed.png");
                fleIzq.animate({
                  opacity: "0.2",
                }, 500, function () { fleIzq.remove()});
             });
    fleDer.animate({
      marginLeft: "1px"
    }, 1000, function () {
                fleDer.attr("src", "images/rArrRed.png");
                fleDer.animate({
                  opacity: "0.2",
                }, 500, function () { fleDer.remove()});
             });
    inf.animate({
      marginLeft: "1px"
    }, 1000, function () {
                inf.animate({
                  fontSize: "+=0.4em",
                  opacity: "0.5"
                }, 500, function () { 
                  inf.text("");
                  inf.css({opacity: "1", fontSize: "0.8em"});
                });
             });
  }
}
// Ya no tiene razón de ser */

function muestraCarta(carta) {
  carta.text(carta.attr("value"));
  //carta.css("background-image", "url(images/anversocarta.jpg)");
  carta.toggleClass("cartaMostrada");
  carta.animate({
    fontSize:   "+=15px",
    color:      "#c00",
    fontWeigth: "bolder"
  }, tiempoMuestraCarta, function() {
      if (cartaAnterior != null) { // Ya hay una carta descubierta
        compruebaPareja(carta);
        var tir = $("#numTiradas");
        if (enJuego) {tir.text(parseInt(tir.text())+1);}
      } else { // Si no hay carta, dejo esta descubierta;
        cartaAnterior = $(carta);
      }
  });
}

function compruebaPareja(carta) {
    if (cartaAnterior.attr("value") == carta.attr("value") && enJuego) {
      intentos++;
      // Son iguales. Dejo ambas cartas mostradas, como acertadas y sigue el juego
      acierto(carta);
      acierto(cartaAnterior);
      var pun = $("#puntos");
      var puntObt = (intentos < 10 ? (11 - intentos) : 0);
      pun.text(parseInt(pun.text())+puntObt);
      intentos = 0;
      burbuja(carta, puntObt);
      compruebaFin(); // Comprobar si todas están descubiertas.
    } else {
      // Las cartas no son iguales, vuelvo a ocultar las cartas.
      intentos++;
      ocultaCarta(carta);
      ocultaCarta(cartaAnterior);
    }
    cartaAnterior = null;
}

function compruebaFin() {
  var numDesc = 0;
  $(".carta").each(function(i) {
    if ($(this).text() != 0) numDesc++;
  });
  if (numDesc == numCartas) {
    // Uso el plugin jquery.fireworks.js para crear fuegos artif.
    $("body").fireworks();
    // Tras 8 segundos desactivo el plugin.
    setTimeout(function () { 
        $('body').fireworks('destroy');
        enJuego = false;
        destruirJuego();
      }, tiempoFuegos);
  }
}

function burbuja(carta, puntObt) {
  var padre = $("body");
  var idB = (puntObt<5? "burbOra": "burbBlue");
  var idbR = (puntObt<5? "burbOraRota": "burbBlueRota");
  atributos = {id: idB, class: "burbuja " + idB};
  crearElemento(padre, "<DIV/>", atributos);
  var burbuja = $("#"+idB);
  burbuja.css({left: posX, top: posY});
  burbuja.text(puntObt);
  burbuja.animate({
    top: "50px",
    opacity: "0.5"
  }, 1000, function () { 
                        var clases = idB + " " + idbR;
                        burbuja.toggleClass(clases);
                       }
  );
  burbuja.animate({
    opacity: "0.2",
    top: "+=50px",
    left: "+=50px",
    height: "-=100px",
    width: "-=100px",
    lineHeight: "-=100px",
    fontSize: "-=80px"
  }, 300 , function () { burbuja.remove()});
}

function ocultaCarta(carta) {
  carta.animate({
    fontSize:   "-=15px",
    color:      "#fff",
    fontWeigth: "normal"
  }, 250, function () {
      carta.toggleClass("cartaMostrada");
  }).text("");
}

function acierto(carta) {
  carta.animate({
    fontSize:   "+=10px",
    color:      "#0b0",
    fontWeigth: "bolder"
  });
  carta.addClass("cartaAcertada");
}

function crearTablero() {
  if ($("body").children().length == 0) { // Inicio del juego
    var padre = $("body");
    // Creamos div para marcador e info
    var atributos = {id: "marcador"};
    var marcador = crearElemento(padre, "<DIV/>", atributos);
    marcadorText();
    // Creamos el tapete para las cartas
    atributos = {id: "tablero", class: "tableroInicioFin"};
    var tablero = crearElemento(padre, "<DIV/>", atributos);
    tablero.html(mensajeInicio);
    atributos = {id: "copyright", class: "footer"};
    var foot = crearElemento(padre, "<FOOTER/>", atributos);
    foot.html(mensajeFooter);
    return; // Salgo de la función;
  } else { //
     $("#tablero").empty(); // Vacío el tablero para poner las cartas.
    // Si las cartas ya están creadas vacío el array de cartas
    if (arrCartas.length > 0 ) {
      arrCartas.splice(0, arrCartas.length);
    }
    arrayCartas(); // Creo los números para las cartas. Repartir y barajar.
    crearCartas(); // Creo las cartas y las muestro.
  }
}

function marcadorText() {
  var padre = $("#marcador");
  // DIV Puntuación
  var atributos = {id: "puntuacion"};
  var punts = crearElemento(padre, "<DIV/>", atributos);
  atributos = {class: "gloria titulo"};
  crearElemento(punts, "<h2/>", atributos, "Puntuación");
  atributos = {id: "puntos", class: "gloria"};
  crearElemento(punts, "<p/>", atributos, "0");
  // DIV Centro
  atributos = {id: "botonStart"};
  var start = crearElemento(padre, "<DIV/>", atributos);
    // Div superior para botones
      atributos = {id: "startSup"};
      var startSup = crearElemento(start, "<DIV/>", atributos);
    // Div inferior, para mensaje de texto
      atributos = {id: "startInf"};
      var startInf = crearElemento(start, "<DIV/>", atributos);
  // DIV Botón
  atributos = {
    id: "start",
    src: "images/start.png",
    title: "Haz clic para Iniciar"
  };
  var botStart = crearElemento(startSup, "<img/>", atributos);
  // DIV Tiradas
  atributos = {id: "tiradas"};
  var tiradas = crearElemento(padre, "<DIV/>", atributos);
  atributos = {class: "gloria titulo"};
  crearElemento(tiradas, "<h2/>", atributos, "Tiradas");
  atributos = {id: "numTiradas", class: "gloria"};
  crearElemento(tiradas, "<p/>", atributos, "0");
}

function crearCartas() {
  var padre = $("#tablero");
  for (var i = 1; i<=numCartas; i++) {
    var carta = $("<div/>");
    // Guardo el valor de la carta en el atributo value
    carta.attr({id: "c"+i, class: "carta", value: arrCartas[i-1]});
    padre.append(carta);
    // Las muestro según el valor de la variable cartasPorFila
    if (i%cartasPorFila == 0) {
      var rompeFila = $("<br/>");
      rompeFila.attr("class", "clear");
      padre.append(rompeFila);
    }
    // Barrido de cartas. 
    if (muestraInicio) {
        setTimeout(muestraCarta, 50*i, $("#c"+i));
    }
  }
  // Creo el evento click para las cartas.
  $(".carta").on({
    click: function(e) {
      if (enJuego) {
        var event = e || window.event;
        posX = e.pageX;
        posY = e.pageY;
        var carta = $(this);
        if (carta.text() == "") { // La carta no está mostrada
          muestraCarta(carta);
        } else {
          return; // Si ya se ha mostrado no hago nada.
        }
      } else {
          pistaIniciar();
      }
    }
  });
}

function destruirJuego() {
  var tablero = $("#tablero");
  tablero.addClass("tableroInicioFin");
  tablero.empty().html(mensajeGameOver);
  $("#start").attr("src", "images/start.png");
}

// Función para simplificar la creación de elementos DOM
function crearElemento(idPadre, tipo, tipoValorAttr, text = "") {
  var hijo = $(tipo);
  hijo.attr(tipoValorAttr);
  hijo.text(text);
  idPadre.append(hijo);
  return hijo;
}
