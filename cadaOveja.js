var numCartas = 24; // Número par
var cartasPorFila = 8; // Debe ser divisor exacto de numCartas para que sea simétrico.
enJuego = false;
var insertCoin = "<br/>Insert coin<br/><br/><img src='images/coin.gif' width='90px' /><br/>or press 'S' to play";
var mensajeInicio = "¡ Sheep Couples !" + insertCoin;
var mensajeGameOver = "";
var mensajeFooter = "&copy; Agustín Lorenzo " + new Date().getFullYear() + " <a href='https://github.com/hftomler'>github -> hftomler </a>";
var retBarr = 100 // Milisegundos para mostrar siguiente carta en el barrido inicial.
var arrCartas = [];
var valorMaxCarta = 12;
var cartaAnterior = null;
var intentos = "";
var posX = 0; // Posición x del ratón. Para mostrar burbujas puntuación.
var poxY = 0; // Posición y del ratón. Para mostrar burbujas puntuación.
var tiempoFuegos = 8000; // Tiempo (ms) duran los fuegos art. finales
var pista; // Variable para intervalo pista de pulsación botón start.
var crono; // Variable para el intervalo del cronómetro.
var hinicio; // Variable para capturar hora de inicio del crono.
var tiempo = new Date(-3600000); // Tiempo que se ha invertido en la partida.
var tiempoNewPlayer = new Date(0); // Tiempo para nuevos jugadores.
var mejorPunt = 0; // Mejor puntuación del usuario actual
var nombreJugador = "PY1UNN"; // La primera vez que se ejecuta el nombre está vacío.
var nombresPlayersESLA = ["Adrahil", "Aegnor", "Aerandir", "Aghan", "Aglahad", "Ailinel", "Alatar", "Aldamir", "Aldor", "Almarian", "Almiel", "Amandil", "Amdír", "Amlaith", "Amrod", "Amroth", "Anardil", "Anborn", "Ancalagon The Black", "Andróg", "Angbor", "Angelimar", "Angelimir", "Angrod", "Anárion", "Ar-Adûnakhôr", "Ar-Gimilzôr", "Ar-Pharazôn", "Ar-Sakalthôr", "Ar-Zimrathôn", "Arador", "Araglas", "Aragorn I", "Aragorn II Elessar", "Aragost", "Arahad I", "Arahad II", "Arahael", "Aranarth", "Aranuir", "Araphant", "Araphor", "Arassuil", "Arathorn I", "Arathorn II", "Araval", "Aravir", "Aravorn", "Arciryas", "Aredhel", "Argeleb I", "Argeleb II", "Argonui", "Arien", "Artamir", "Arthad", "Arvedui", "Arvegil", "Arveleg I", "Arveleg II", "Arwen", "Asgon", "Atanamir -Atanatar I", "Atanatar II", "Aulë", "Azaghâl", "Azog", "Bain", "Baldor", "Balin", "Barach", "Baragund", "Barahir", "Barahir (Steward)", "Baran", "Bard II", "Bard the Bowman", "Barliman Butterbur", "Beldis", "Belecthor I", "Belecthor II", "Beleg Cúthalion", "Beleg of Arnor", "Belegorn", "Belegund", "Belemir", "Belen", "Beorn", "Beregond", "Beregond (Captain)", "Beren", "Beren (Steward)", "Bergil", "Bilbo Baggins", "Angelica Baggins", "Bilbo Baggins", "Fosco Baggins", "Bungo Baggins", "Frodo Baggins", "Longo Baggins", "Mungo Baggins", "Pansy Baggins", "Bill", "Blanco", "Bob", "Bofur", "Bolg", "Fredegar Bolger", "Tom Bombadil", "Bombur", "Borin", "Borlach", "Borlad", "Boromir", "Boromir", "Boromir (Steward)", "Borthand", "Brand", "Amaranth Brandybuck", "Estella (Bolger) Brandybuck", "Madoc Brandybuck", "Meriadoc Brandybuck", "Brego", "Brodda", "Bungo Baggins", "Bëor", "Calimehtar", "Calmacil", "Captains of the West", "Caranthir", "Carc", "Carcharoth", "Castamir the Usurper", "Celeborn", "Celebrimbor", "Celebrindor", "Celebrían", "Celegorm", "Celepharn", "Cemendur", "Cirion", "Ciryandil", "Ciryatur", "Ciryon", "Curufin", "Círdan", "Farmer Cotton", "Rosie Cotton", "Eärendil", "Ecthelion I", "Ecthelion II", "Ecthelion of the Fountain", "Egalmoth Eilinel", "Elatan", "Elboron", "Eldacar of Gondor", "Eldalótë", "Eldarion", "Elemmakil", "Elendil", "Elfhild", "Elfwine", "Elladan and Elrohir", "Elmo", "Elrond", "Elros", "Eluréd and Elurín", "Elwing", "Enel", "Enerdhil", "Éomer", "Eorl the Young", "Eothain", "Éowyn", "Eradan", "Erchirion", "Erendis", "Erestor", "Erkenbrand", "Eru Ilúvatar", "Eärendil", "Eärendil of Gondor", "Eärendur (Lord of Andúnië)", "Eärendur of Arnor", "Eärendur of Númenor", "Eärnil I", "Eärnil II", "Eärnur", "Eärwen", "Eöl", "Eönwë", "Faramir", "Fastred", "Fengel", "Finarfin", "Findegil", "Finduilas", "Finduilas of Dol Amroth", "Fingolfin", "Fingon", "Finrod Felagund", "Finwë", "Folca", "Folcred", "Folcwine", "Forlong", "Forthwini", "Fram", "Freca", "Frodo Baggins", "Frumgar", "Frár", "Fréa", "Frëawine", "Frór", "Fuinur", "Fundin", "Fëanor", "Fíli", "Hadhod", "Hador", "Hador (Steward)", "Halbarad", "Haldad", "Haldar", "Haldir", "Haleth (Son of Háma)", "Hallacar", "Hallas (Steward)", "Halmir", "Harding", "Hareth", "Helm Hammerhand", "Herion", "Herucalmo", "Herumor", "Hirgon", "Fréaláf Hildeson", "Horn", "Tobias Hornblower", "Tobold Hornblower", "Huan", "Hunthor", "Hyarmendacil I", "Hyarmendacil II", "Háma", "Húrin", "Húrin I", "Húrin II", "Ibûn", "Idril", "Imin", "Imrahil", "Indis", "Ingwion", "Ingwë", "Inzilbêth", "Iorlas", "Irmo", "Isildur", "Isilmo", "Ivorwen", "Khamûl", "Khîm", "Kíli", "Legolas", "Lenwë", "Lindo", "Lindórië", "Lorgan", "Lothíriel", "Lugdush", "Léod", "Brytta Léofa", "Lúthien", "Mablung", "Mablung the Ranger", "Maedhros", "Maeglin", "Maglor", "Farmer Maggot", "Mahtan", "Mahud", "Mahúr", "Mairen", "Malach", "Mallor", "Malvegil", "Man in the Moon", "Mandos", "Marach", "Marcho", "Marhari", "Marhwini", "Master of Laketown", "Melian", "Melkor", "Meneldil", "Meneldor", "Minardil", "Minastan", "Mithrellas", "Morwen", "The Moth", "Mouth of Sauron", "Muzgash", "Míriel", "Mîm", "Narmacil I", "Narmacil II", "Nellas", "Nerdanel", "Nessa", "Nienna", "Nimloth (elf)", "Niënor", "Nob", "Náin I", "Númendil", "Olwë", "Ondoher Orchaldor", "Orcobal", "Ori", "Orodreth", "Orodreth (Steward)", "Oromë", "Oropher", "Orophin", "Ossë", "Ostoher", "Radagast", "River-woman", "Rogash", "Roäc", "Ruffian Leader", "Rumil", "Rómendacil I", "Rómendacil II", "Andwise Roper", "Rúmil", "Lobelia Sackville-Baggins", "Lotho Sackville-Baggins", "Sador", "Saeros", "Salmar", "Saruman", "Sauron", "Shadowfax", "Shagrat", "Shelob", "Silmariën", "Siriondil", "Smaug", "Sméagol", "Soronto", "Squint-eyed Southerner", "Morwen Steelsheen", "Robin Smallburrow", "Tar-Alcarin", "Tar-Aldarion", "Tar-Amandil", "Tar-Ancalimon", "Tar-Ancalimë", "Tar-Anárion", "Tar-Ardamin", "Tar-Atanamir", "Tar-Calmacil", "Tar-Ciryatan", "Tar-Elendil", "Tar-Meneldur", "Tar-Minastir", "Tar-Míriel -Tar-Palantir", "Tar-Súrion", "Tar-Telemmaitë", "Tar-Telperiën", "Tar-Vanimeldë", "Tarannon Falastur", "Tarcil", "Targon", "Tarondor", "Tata", "Telemnar", "Telumehtar", "Tevildo", "Thengel", "Thingol", "Thorin I", "Thorin II Oakenshield", "Thorin III Stonehelm", "Thorondir", "Thorondor", "Thranduil", "Thráin I", "Thráin II", "Thrór", "Théoden", "Théodred", "Tilion", "Tom, Bert, and William", "Tom Bombadil", "Adalgrim Took", "Bullroarer Took", "Adelard Took", "Goldilocks (Gardner) Took", "Peregrin Took", "Esmeralda Took", "Pimpernel Took", "Treebeard", "Tulkas", "Tuor", "Turambar", "Turgon", "Turgon (Steward)", "Two Watchers", "Túrin I", "Túrin II", "Túrin Turambar", "Daddy Twofoot", "Ulbar", "Uglúk", "Uinen", "Uldor", "Ulfang", "Ulfast", "Ulmo", "Ulrad", "Ulwarth", "Ungoliant", "Vairë", "Valacar", "Valandil", "Valandil of Andúnië", "Varda", "Vardamir Nólimon", "Vidugavia", "Vidumavi", "Vorondil the Hunter", "Voronwë", "Vána", "Vëantur", "Walda", "Wife of Barach", "Witch-king of Angmar", "Wulf", "Yavanna", "Zamîn"]
var nombresPlayersSTARW = ["Anakin Skywalker", "Anakin Solo", "Arren Kae", "Ask Aak", "Attichitcuk", "Ayy Vida", "Banda Max Rebo", "Bene", "Biggs Darklighter", "Bodo Baas", "Bossk", "Cade Skywalker", "Capitán Rex", "Carlist Rieekan", "Darra Thel-Tanis", "Centinelas de Byss", "Chalmun", "Charal", "Chewbacca", "Clone trooper", "Conde Dooku", "Cordé", "Crix Madine", "Darth Bane", "Darth Caedus", "Darth Malak", "Darth Maul", "Darth Plagueis", "Darth Vader", "Dash Rendar", "Demetrius Zaarin", "Diva Funquita", "Diva Shaliqua", "Djas Puhr", "Doda Bodonawieedo", "Dominus", "Dormé", "Durge", "Dutch Vander", "Ephant Mon", "Fang Zar", "Feltipern Trevagg", "Ferus Olin", "Jango Fett", "Boba Fett", "Finis Valorum", "Finn", "Firmus Piett", "Galen Marek", "Garm Bel Iblis", "Garven Dreis", "General Grievous", "General Rahm Kota", "Gilramos Libkath", "Gizor Dellso", "Greeata", "Greedo", "Gregar Typho", "Guardia Real del Emperador", "Han Solo", "Ikrit", "Jabba el Hutt", "Jamillia", "Jan Dodonna", "Jar Jar Binks", "Jek Porkins", "Jerjerrod", "Joh Yowza", "Jorus C'baoth", "Korven Winex", "Kren Blista-Vanee", "Kylo Ren", "Labashi-Marduk", "Lama Su", "Lando Calrissian", "Lobot", "Lord Oscuro", "Lowbacca", "Luke Skywalker", "Lumpawarrump", "Lunae Minx", "Líder Supremo Snoke", "Maris Brood", "Mas Amedda", "Max Rebo", "Maximilian Veers", "Meena Tills", "Miko Reglia", "Momaw Nadon", "Nien Nunb", "Nom Anor", "Nute Gunray", "Olee Starstone", "Orn Free Taa", "Ozzik Sturn", "Palpatine", "Panaka", "Passel Argente", "Poe Dameron", "Poggle el Menor", "Roan Shryne", "Rogwa Wodrata", "Roos Tarpals", "Roron Corobb", "Rosh Penin", "Rugor Nass", "Rune Haako", "Sabé", "San Hill", "Sar Labooda", "Sarrissa Jeng", "Satal Keto", "Saul Karath", "Sebulba", "Señor Oscuro de los Sith", "Shaak Ti", "Shu Mai", "Sidonra Diath", "Sifo-Dyas", "Shmi Skywalker", "Stormtrooper", "Talon Karrde", "Tarfful", "Tavion Axmis", "Tenel Ka", "Terak", "Thon", "Thrawn", "Tikkes", "Tion Medon", "Tru Veld", "Tsui Choi", "Ulic Qel-Droma", "Vergere", "Watto", "Wedge Antilles", "Wicket W. Warrick", "Wilhuff Tarkin", "XizorYuthura Ban", "Zez-Kai Ell", "Zsinj", "Zuckuss"]
var minutos, segundos; // Cadenas para ajustar plural y singular de segundos;
tiempoMuestraCarta = 300; // Tiempo en milisegundos que se muestra la carta
muestraInicio = true; // False si no se quiere barrido al principio
posPlayerZone = "left";
fondoCarta = "cred";

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
  $("html").css("height", "100%");
  $("body").css("min-height", "100%"); // Establezco el body a la altura máxima de pantalla
  crearTablero(); // Muestro el tablero por primera vez
  $(document).confCadaOveja(); // Ejecuto el plugin con las opciones por defecto.
  pideNombre();
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
  mensajeGameOver = "<br/>¡ FELICIDADES, ";
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

function muestraCarta(carta, tMuestra) {
  carta.text(carta.attr("value"));
  //carta.css("background-image", "url(images/anversocarta.jpg)");
  carta.toggleClass("cartaMostrada");
  carta.animate({
    fontSize:   "+=5px",
    color:      "#c00",
    fontWeigth: "bolder"
  }, tMuestra, function() {
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
    // Tras tiempoFuegos->segundos desactivo el plugin.
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
    carta.addClass(fondoCarta);
    padre.append(carta);
    // Las muestro según el valor de la variable cartasPorFila
    if (i%cartasPorFila == 0) {
      var rompeFila = $("<br/>");
      rompeFila.attr("class", "clear");
      padre.append(rompeFila);
    }
    // Barrido de cartas. Después de crear las cartas se muestran durante 0.1 segundos. 
    if (muestraInicio) {
        setTimeout(muestraCarta, retBarr*i, $("#c"+i), retBarr);
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
          muestraCarta(carta, tiempoMuestraCarta);
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
  guardaDatos(nombreJugador, tiempo, $("#puntos").text()); // Guarda los datos en la cookie del jugador si son mejores que los que había.
  setTimeout(function() { // Vuelvo al mensaje de Inicio
    tablero.empty().html(mensajeInicio);
  }, 6000);
  $("#start").attr("src", "images/start.png");

  pista = setInterval(pistaIniciar, 6000);
  activaTeclaS();
  playerZone();
}


// Pedir nombre. De momento con prompt()

function pideNombre() {
  if (Cookies.getJSON(nombreJugador) == undefined) {
    // Crea el div para la ventana modal
    var padre = $("body");
    var valid = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ]{3,16}$/;
    var atributos = {id: "popup", style: "display: none"};
    var modal = crearElemento(padre, "<DIV/>", atributos);
    atributos = {class: "popup-overlay"};
    crearElemento(padre, "<DIV/>", atributos);
    modal.html("<div class='content-popup'>" +
                  "<div class='close'>" + 
                    "<a href='#' id='close'><img id='closBt' src='images/close.png' /></a>" +
                  "</div>" +
                  "<div>" +
                    "<h2>Nombre del Jugador</h2>" +
                    "<input type='text' id='iNombre'><br/>" +
                    "<input type='image' id='bNombre' " + 
                           "title='Introduce tu nombre' src='images/botonNombre.jpg'>" +
                    "<input type='image' id='bNombreESLA' " + 
                           "title='Nombre aleatorio Señor de los Anillos'  src='images/botonEsla.jpg'>" +
                    "<input type='image' id='bNombreSTARW' " + 
                           "title='Nombre aleatorio Star Wars' src='images/botonStar.jpg'><br/>" +
                    "<span>Pasa el ratón por cada botón para conocer su efecto</span>" +
                  "</div>" +
                "</div>");
    $("#iNombre").focus();
    blurElement("#container", 5); 
    $("#popup").fadeIn("slow");
    var fondo = $(".popup-overlay");
    fondo.fadeIn("slow");
    fondo.height($(window).height());
    $("#bNombre").on ({
      click: function () {
        var nombreInt = $("#iNombre").val();
        if (nombreInt != "" && (valid.test(nombreInt))) {
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          nombreJugador = $("#iNombre").val().toUpperCase();
          guardaDatos(nombreJugador, tiempoNewPlayer, 0);
          $("#popup, .popup-overlay").remove();
          activaTeclaS();
          playerZone();
        } else {
          $("#iNombre").focus();
        }      
      }
    });
      /* Si en la ventana modal se pulsa Nombre ESLA y el valor de nombreJugador es "PY1UNN", 
      se escoge un nombre aleatorio y se crea la cookie. 
      */
    $("#bNombreESLA").on ({
      click: function () {
        if (nombreJugador == "PY1UNN") nombreJugador = nombresPlayersESLA[Math.floor(Math.random()*nombresPlayersESLA.length)];
          guardaDatos(nombreJugador, tiempoNewPlayer, 0);
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          $("#popup, .popup-overlay").remove();
          activaTeclaS();
          playerZone();
      }
    });
    $("#bNombreSTARW").on ({
      click: function () {
        if (nombreJugador == "PY1UNN") nombreJugador = nombresPlayersSTARW[Math.floor(Math.random()*nombresPlayersSTARW.length)];
          guardaDatos(nombreJugador, tiempoNewPlayer, 0);
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          $("#popup, .popup-overlay").remove();
          activaTeclaS();
          playerZone();
      }
    });
    $("#close, .popup-overlay").on ({
      click: function () {
        if (nombreJugador == "PY1UNN") nombreJugador = nombresPlayers[Math.floor(Math.random()*nombresPlayers.length)];
          guardaDatos(nombreJugador, tiempoNewPlayer, 0);
          $('#popup').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          $("#popup, .popup-overlay").remove();
          activaTeclaS();
          playerZone();
      }    
    });
  } else {
    activaTeclaS();
    playerZone();
  }
}

function playerZone() {
  var coo = Cookies.getJSON(nombreJugador);
  var tiempoJug = new Date(coo.tiempo);
  var puntosJug = coo.puntos;
  var padre = $("#jugDat");
  padre.css(posPlayerZone, "15px");
  var img = "1star.png";
  if ($("#puntos").text() > 30) img = "2star.png";
  if ($("#puntos").text() > 50) img = "3star.png";
  if ($("#puntos").text() > 70) img = "4star.png";
  if ($("#puntos").text() > 90) img = "5star.png";
  padre.empty();
  padre.html("<div><img id='config' src='images/configuration.png' /></div>" +
             "<div><img src='images/user.png' /><br/>" + nombreJugador +"</div>" +

             "<div><img src='images/clock.png' /><br/>" + tiempoJug.toLocaleTimeString() + "</div>" +
             "<div><img src='images/"+ img + "' /><br/>" + puntosJug + " puntos</div>" +
             "<div><img id='logout' src='images/logout.png' />");
    $("#logout").on ({
      click: function() {
        if (!enJuego) {
          nombreJugador = "PY1UNN";
          $(document).off("keydown");
          padre.empty();
          $("#iNombre").val("");
          pideNombre();
        }
      }
    });
    $("#config").on ({
      click: function() {
        $(document).confCadaOveja({
                    posPlayerZone: "left",
                    tiempoMuestraCarta: 500,
                    fondoCarta: "cred"
        });
      }
    }); 
}

// FUNCTIONES AUXILIARES

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
  $("#crono").remove();
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

// Para mostrar strings de tiempo

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

// FUNCIONES RELACIONADAS CON COOKIES

// Guarda los datos del jugador en su cookie

function guardaDatos(nombreJugador, tiempo, puntos) {
  if (Cookies.getJSON(nombreJugador) == undefined) {
    Cookies.set(nombreJugador, {tiempo: tiempo, puntos: puntos}, { expires: 7, path: ''});
  } else {
    var datos = Cookies.getJSON(nombreJugador); // Recupero los datos guardados.
    var fecha = new Date(datos.tiempo);
    var fechaNew = (tiempo < fecha ? tiempo : fecha);
    var puntosAnt = datos.puntos; // Mejor puntuación guardada.
    var puntosNuevo = (puntosAnt > $("#puntos").text() ? puntosAnt : $("#puntos").text());
    // Vuelvo a almacenar la cookie y actualizo el PlayerZone*/
    Cookies.set(nombreJugador, {tiempo: fechaNew, puntos: puntosNuevo}, { expires: 7, path: ''});
  }
  playerZone();
}