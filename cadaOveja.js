var numCartas = 24; // Número par
var cartasPorFila = 8; // Debe ser divisor exacto de numCartas para que sea simétrico.
var enJuego = false;
var insertCoin = "<br/>Insert coin<br/><br/><img src='images/coin.gif' width='90px' /><br/>or press 'S' to play";
var mensajeInicio = "¡ Sheep Couples !" + insertCoin;
var mensajeGameOver = "<br/>¡ FELICIDADES, ";
var mensajeFooter = "&copy; Agustín Lorenzo " + new Date().getFullYear() + " <a href='https://github.com/hftomler'>github -> hftomler </a>";
var muestraInicio = true; // False si no se quiere barrido al principio
var retBarr = 100 // Milisegundos para mostrar siguiente carta en el barrido inicial.
var arrCartas = [];
var valorMaxCarta = 12;
var cartaAnterior = null;
var intentos = "";
var posX = 0; // Posición x del ratón. Para mostrar burbujas puntuación.
var poxY = 0; // Posición y del ratón. Para mostrar burbujas puntuación.
var tiempoFuegos = 8000; // Tiempo (ms) duran los fuegos art. finales
var tiempoMuestraCarta = 300; // Tiempos en milisegundos que se muestra la carta
var pista; // Variable para intervalo pista de pulsación botón start.
var crono; // Variable para el intervalo del cronómetro.
var hinicio; // Variable para capturar hora de inicio del crono.
var tiempo = 0; // Tiempo que se ha invertido en la partida.
var nombreJugador = "";
var minutos, segundos; // Cadenas para ajustar plural y singular de segundos;

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
  if (Cookies.get('nombre') == undefined) {
    pideNombre();
  } else {
    playerZone();
  }
  pista = setInterval(pistaIniciar, 6000);
  // Si se pulsa la imagen Start o la tecla S, comienza el juego
  $("#start").on({
    click: function() {
      if (!enJuego) {
        clearInterval(pista); // Elimino la pista de donde pulsar
        crearTablero(); // Limpio el tablero y muestro cartas.
        if (muestraInicio) { // Retardo para esperar que acabe el barrido de cartas inicial
         setTimeout(inicVar, retBarr*(numCartas+4)); 
        } else {
          inicVar(); // Si no hay barrido inicial de cartas
        }
      }
    }
  })
});


function activaTeclaS() {
  $(document).on( {
    keydown: function(event){
      if ((event.key).toUpperCase() == "S" ) {
        if (!enJuego) {
          $(document).off("keydown");
          clearInterval(pista);
          crearTablero(); // Limpio el tablero y muestro cartas.
          if (muestraInicio) {
           setTimeout(inicVar, retBarr*(numCartas+4)); 
          } else {
            inicVar();
          }      
        }
      }
    }
  });
}

function inicVar() {
  $("#puntos").text("0");
  $("#numTiradas").text("0");
  tiradas = 0;
  intentos = 0;
  enJuego = true;
  $("#start").attr("src", "images/startPulsado.png");
  iniciaCrono();
}


// Se indica visualmente donde hacer clic para comenzar. 
function pistaIniciar() {
  if (!($("#leftStart").is("img"))) { // Ya se está mostrando una flecha.
    var sup = $("#startSup");
    var inf = $("#startInf");
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
                }, 750, function () { fleIzq.remove()});
             });
    fleDer.animate({
      marginLeft: "1px"
    }, 1000, function () {
                fleDer.attr("src", "images/rArrRed.png");
                fleDer.animate({
                  opacity: "0.2",
                }, 750, function () { fleDer.remove()});
             });
    var textInf = $("<p/>");
    textInf.attr({id: "textInf"});
    inf.append(textInf);
    textInf.text("Haz clic en el botón o pulsa 'S'");
    textInf.animate({
      fontSize: "+=0.5em",
      opacity: "1"    
    }, 1000, function () {
                textInf.animate({
                  fontSize: "-=0.5em",
                  opacity: "0"
                }, 750, function () {textInf.remove()})
             });
  }
}

function muestraCarta(carta) {
  carta.text(carta.attr("value"));
  //carta.css("background-image", "url(images/anversocarta.jpg)");
  carta.toggleClass("cartaMostrada");
  carta.animate({
    fontSize:   "+=5px",
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
    paraCrono();
    // Uso el plugin jquery.fireworks.js para crear fuegos artif.
    $("body").fireworks();
    // Tras 8 segundos desactivo el plugin.
    setTimeout(function () { 
        $('body').fireworks('destroy');
        $("#crono").remove();
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
    fontSize:   "-=5px",
    color:      "#fff",
    fontWeigth: "normal"
  }, 250, function () {
      carta.toggleClass("cartaMostrada");
  }).text("");
}

function acierto(carta) {
  carta.animate({
    fontSize:   "+=5px",
    color:      "#0b0",
    fontWeigth: "bolder"
  });
  carta.addClass("cartaAcertada");
}

function crearTablero() {
  if ($("body").children().length == 0) { // Inicio del juego
    var padre = $("body");
    var atributos = {id: "container"};
    var container = crearElemento(padre, "<DIV/>", atributos);
    // Div para player y logout
    atributos = {id: "jugDat"};
    crearElemento(padre, "<DIV/>", atributos);
    // Div para marcador e info
    atributos = {id: "marcador"};
    var marcador = crearElemento(container, "<DIV/>", atributos);
    crearMarcador();
    // Creamos el tapete para las cartas
    atributos = {id: "tablero", class: "tableroInicioFin"};
    var tablero = crearElemento(container, "<DIV/>", atributos);
    tablero.html(mensajeInicio);
    atributos = {id: "copyright", class: "footer"};
    var foot = crearElemento(container, "<FOOTER/>", atributos);
    foot.html(mensajeFooter);
    return; // Salgo de la función;
  } else { //
     $("#tablero").empty(); // Vacío el tablero para poner las cartas.
     $("#tablero").removeClass("tableroInicioFin");
    // Si las cartas ya están creadas vacío el array de cartas
    if (arrCartas.length > 0 ) {
      arrCartas.splice(0, arrCartas.length);
    }
    arrayCartas(); // Creo los números para las cartas. Repartir y barajar.
    crearCartas(); // Creo las cartas y las muestro.
  }
}

function crearMarcador() {
  var padre = $("#marcador");
  // DIV Puntuación
  var atributos = {id: "puntuacion"};
  var punts = crearElemento(padre, "<DIV/>", atributos);
  atributos = {class: "gloria titulo"};
  crearElemento(punts, "<h2/>", atributos, "Puntos");
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
    // Barrido de cartas. Después de crear las cartas se muestran durante 0.1 segundos. 
    if (muestraInicio) {
        setTimeout(muestraCarta, retBarr*i, $("#c"+i));
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
  ajustaCadenaTiempo();
  mensajeGameOver += nombreJugador + " !<br/><br/> Tu tiempo: ";
  mensajeGameOver += tiempo.getMinutes() + " " + minutos + " y " + tiempo.getSeconds() + " " + segundos + ".<br/>";  
  mensajeGameOver += "Puntuación: " + $("#puntos").text() + " puntos";  
  tablero.empty().html(mensajeGameOver);
  $("#start").attr("src", "images/start.png");
  pista = setInterval(pistaIniciar, 6000);
  activaTeclaS();
}

function ajustaCadenaTiempo() {
  minutos = (tiempo.getMinutes() != 1 ? "minutos": "minuto");
  segundos = (tiempo.getMinutes() != 1 ? "segundos": "segundo");
}

// Función para simplificar la creación de elementos DOM
function crearElemento(idPadre, tipo, tipoValorAttr, text = "") {
  var hijo = $(tipo);
  hijo.attr(tipoValorAttr);
  hijo.text(text);
  idPadre.append(hijo);
  return hijo;
}

// Pedir nombre. De momento con prompt()

function pideNombre() {
  // Crea el div para la ventana modal
  var padre = $("body");
  var atributos = {id: "popup", style: "display: none"};
  var modal = crearElemento(padre, "<DIV/>", atributos);
  atributos = {class: "popup-overlay"};
  crearElemento(padre, "<DIV/>", atributos);
  if (Cookies.get('nombre') == undefined) {
    modal.html("<div class='content-popup'>" +
                  "<div class='close'>" + 
                    "<a href='#' id='close'><img id='closBt' src='images/close.png' /></a>" +
                  "</div>" +
                  "<div>" +
                    "<h2>Nombre del Jugador</h2>" +
                    "<input type='text' id='iNombre'><br/>" +
                    "<input type='button' id='bNombre' value='Guardar'>" +
                  "</div>" +
                "</div>");
    $("#bNombre").on ({
      click: function () {
        if ($("#iNombre").val() != "") {
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          nombreJugador = $("#iNombre").val();
          Cookies.set('nombre', nombreJugador, { expires: 7 });
          playerZone();
          activaTeclaS();
        } else {
          $("#iNombre").focus();
        }      
      }
    })
    $("#close").on({
      click: function() {
        if ($("#iNombre").val() != "") {
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          nombreJugador = $("#iNombre").val();
          playerZone();
          activaTeclaS();
        } else {
          $("#iNombre").focus();
        }
      }
    });
    $("#popup").fadeIn("slow");
    var fondo = $(".popup-overlay");
    fondo.fadeIn("slow");
    fondo.height($(window).height());
    fondo.on({
      click: function() {
        if ($("#iNombre").val() != "") {
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          nombreJugador = $("#iNombre").val();
          playerZone();
          activaTeclaS();
        } else {
          $("#iNombre").focus();
        }
      }
    });
    blurElement("#container", 5); 
    $("#iNombre").focus();
  } else {
    nombreJugador = Cookies.get('nombre');
    playerZone();
    activaTeclaS();
  }
}

function playerZone() {
  var padre = $("#jugDat");
  padre.html("<img src='images/logout.png' /><span>Jugador</span><br/>" + nombreJugador);
  $("#jugDat img").on ({
    click: function() {
      Cookies.remove('nombre');
      nombreJugador = "";
      $(document).off("keydown");
      pideNombre();
    }
  })
}

// Funciones de cronómetro

function iniciaCrono() {
  hInicio = new Date();
  crono = setInterval(actualizaCrono, 1);
  var inf = $("#startInf");
  var textInf = $("<DIV/>");
  textInf.attr({id: "crono"});
  inf.append(textInf);
}

function actualizaCrono() {
  var ahora = new Date();
  var horaCrono = new Date(ahora - hInicio);
  horaCrono.setHours(horaCrono.getHours()-1); // ajuste hora
  $("#crono").text(horaCrono.toLocaleTimeString());
  tiempo = horaCrono;
}

function paraCrono() {
  clearInterval(crono);
}

// Función para desenfocar un elemento. Lo uso en el modal para el fondo
 function blurElement(element, size) {
    var filterVal = 'blur(' + size + 'px)';
    $(element).css({
        'filter':filterVal,
        'webkitFilter':filterVal,
        'mozFilter':filterVal,
        'oFilter':filterVal,
        'msFilter':filterVal,
        'transition':'all 0.5s ease-out',
        '-webkit-transition':'all 0.5s ease-out',
        '-moz-transition':'all 0.5s ease-out',
        '-o-transition':'all 0.5s ease-out'
    });
}