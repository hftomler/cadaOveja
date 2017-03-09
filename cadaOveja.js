var politicaCookies = "Utilizamos cookies para facilitarte el uso de nuestra página web. Las cookies son pequeños ficheros de información que nos permiten comparar y entender cómo nuestros usuarios navegan a través de nuestra página web y enriquecer su experiencia de usuario.<br/><br/>";
politicaCookies += "Estas cookies nos permiten recordar tu nombre de usuario, tu puntuación y demás datos relativos a tu uso de nuestra web. Al visitar nuestra página web, aceptas la instalación de estas cookies en tu dispositivo<br/>";
var numCartas = 24; // Número par
var cartasPorFila = 8; // Debe ser divisor exacto de numCartas para que sea simétrico.
enJuego = false;
var insertCoin = "<br/>Insert coin<br/><br/><img src='images/coin.gif' width='90px' /><br/>or press 'S' to play";
var mensajeInicio = "¡ Sheep Couples !" + insertCoin;
var mensajeGameOver = "";
var ccncnd = "<a href=' https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es_ES' ><img src='images/ccncnd.png' title='Reconocimiento, No Comercial y Sin Obra Derivada'/></a>";
var cc = "<a href=' https://creativecommons.org/licenses/by/4.0/deed.es_ES' ><img src='images/cc.png' title='Reconocimiento'/></a>";
canciones = ["Canon in D (Aitua)", "Sappfire Wind (Maxim Kornyshev)", "Winter Smoke (The Owl)", "Rainy Sun", "Concerning Hobbits"];
var sonando = ["<a href='http://freemusicarchive.org/music/Aitua/'>Sonando: 'Canon in D' (Pachelbel) - Aitua</a>" + cc,
               "<a href='http://freemusicarchive.org/music/Maxim_Kornyshev'>Sonando: 'Sappfire Wind' - Maxim Kornyshev</a>" + cc,
               "<a href='http://freemusicarchive.org/music/The_Owl/'>Sonando: 'Winter Smoke' - The Owl</a>" + ccncnd, 
               "<a href='http://freemusicarchive.org/music/The_Owl/'>Sonando: 'Rainy Sun' - The Owl</a>" + ccncnd, 
               "<a href='http://downloads.khinsider.com/game-soundtracks/album/lord-of-the-rings-the-fellowship-of-the-ring-howard-shore/02-concerning-hobbits.mp3'>Sonando: 'Concerning Hobbits' - Howard Shore<img src='images/cc.png' /></a>"];
musicaFondo = ["kanonInD.mp3", "SappfireWind.mp3", "winterSmoke.mp3", "rainySun.mp3", "concerningHobbits.mp3"];
pistaActual = ""; // Pista actual de música de fondo que está sonando.
var copyright = "&copy; Agustín Lorenzo " + new Date().getFullYear() + " <a href='https://github.com/hftomler'>github -> hftomler </a>"; 
var ctrlSonido = "<img src='images/playinGray.png' id='speaker' />";                    
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
var nombreJugador = "PY1UNN"; // Si este es el nombreJugador, indica que no se ha seleccionado nombre Jugador.
var nombresPlayersESLA = ["Adrahil", "Aegnor", "Aerandir", "Aghan", "Aglahad", "Ailinel", "Alatar", "Aldamir", "Aldor", "Almarian", "Almiel", "Amandil", "Amdír", "Amlaith", "Amrod", "Amroth", "Anardil", "Anborn", "Ancalagon The Black", "Andróg", "Angbor", "Angelimar", "Angelimir", "Angrod", "Anárion", "Ar-Adûnakhôr", "Ar-Gimilzôr", "Ar-Pharazôn", "Ar-Sakalthôr", "Ar-Zimrathôn", "Arador", "Araglas", "Aragorn I", "Aragorn II Elessar", "Aragost", "Arahad I", "Arahad II", "Arahael", "Aranarth", "Aranuir", "Araphant", "Araphor", "Arassuil", "Arathorn I", "Arathorn II", "Araval", "Aravir", "Aravorn", "Arciryas", "Aredhel", "Argeleb I", "Argeleb II", "Argonui", "Arien", "Artamir", "Arthad", "Arvedui", "Arvegil", "Arveleg I", "Arveleg II", "Arwen", "Asgon", "Atanamir -Atanatar I", "Atanatar II", "Aulë", "Azaghâl", "Azog", "Bain", "Baldor", "Balin", "Barach", "Baragund", "Barahir", "Barahir (Steward)", "Baran", "Bard II", "Bard the Bowman", "Barliman Butterbur", "Beldis", "Belecthor I", "Belecthor II", "Beleg Cúthalion", "Beleg of Arnor", "Belegorn", "Belegund", "Belemir", "Belen", "Beorn", "Beregond", "Beregond (Captain)", "Beren", "Beren (Steward)", "Bergil", "Bilbo Baggins", "Angelica Baggins", "Bilbo Baggins", "Fosco Baggins", "Bungo Baggins", "Frodo Baggins", "Longo Baggins", "Mungo Baggins", "Pansy Baggins", "Bill", "Blanco", "Bob", "Bofur", "Bolg", "Fredegar Bolger", "Tom Bombadil", "Bombur", "Borin", "Borlach", "Borlad", "Boromir", "Boromir", "Boromir (Steward)", "Borthand", "Brand", "Amaranth Brandybuck", "Estella (Bolger) Brandybuck", "Madoc Brandybuck", "Meriadoc Brandybuck", "Brego", "Brodda", "Bungo Baggins", "Bëor", "Calimehtar", "Calmacil", "Captains of the West", "Caranthir", "Carc", "Carcharoth", "Castamir the Usurper", "Celeborn", "Celebrimbor", "Celebrindor", "Celebrían", "Celegorm", "Celepharn", "Cemendur", "Cirion", "Ciryandil", "Ciryatur", "Ciryon", "Curufin", "Círdan", "Farmer Cotton", "Rosie Cotton", "Eärendil", "Ecthelion I", "Ecthelion II", "Ecthelion of the Fountain", "Egalmoth Eilinel", "Elatan", "Elboron", "Eldacar of Gondor", "Eldalótë", "Eldarion", "Elemmakil", "Elendil", "Elfhild", "Elfwine", "Elladan and Elrohir", "Elmo", "Elrond", "Elros", "Eluréd and Elurín", "Elwing", "Enel", "Enerdhil", "Éomer", "Eorl the Young", "Eothain", "Éowyn", "Eradan", "Erchirion", "Erendis", "Erestor", "Erkenbrand", "Eru Ilúvatar", "Eärendil", "Eärendil of Gondor", "Eärendur (Lord of Andúnië)", "Eärendur of Arnor", "Eärendur of Númenor", "Eärnil I", "Eärnil II", "Eärnur", "Eärwen", "Eöl", "Eönwë", "Faramir", "Fastred", "Fengel", "Finarfin", "Findegil", "Finduilas", "Finduilas of Dol Amroth", "Fingolfin", "Fingon", "Finrod Felagund", "Finwë", "Folca", "Folcred", "Folcwine", "Forlong", "Forthwini", "Fram", "Freca", "Frodo Baggins", "Frumgar", "Frár", "Fréa", "Frëawine", "Frór", "Fuinur", "Fundin", "Fëanor", "Fíli", "Hadhod", "Hador", "Hador (Steward)", "Halbarad", "Haldad", "Haldar", "Haldir", "Haleth (Son of Háma)", "Hallacar", "Hallas (Steward)", "Halmir", "Harding", "Hareth", "Helm Hammerhand", "Herion", "Herucalmo", "Herumor", "Hirgon", "Fréaláf Hildeson", "Horn", "Tobias Hornblower", "Tobold Hornblower", "Huan", "Hunthor", "Hyarmendacil I", "Hyarmendacil II", "Háma", "Húrin", "Húrin I", "Húrin II", "Ibûn", "Idril", "Imin", "Imrahil", "Indis", "Ingwion", "Ingwë", "Inzilbêth", "Iorlas", "Irmo", "Isildur", "Isilmo", "Ivorwen", "Khamûl", "Khîm", "Kíli", "Legolas", "Lenwë", "Lindo", "Lindórië", "Lorgan", "Lothíriel", "Lugdush", "Léod", "Brytta Léofa", "Lúthien", "Mablung", "Mablung the Ranger", "Maedhros", "Maeglin", "Maglor", "Farmer Maggot", "Mahtan", "Mahud", "Mahúr", "Mairen", "Malach", "Mallor", "Malvegil", "Man in the Moon", "Mandos", "Marach", "Marcho", "Marhari", "Marhwini", "Master of Laketown", "Melian", "Melkor", "Meneldil", "Meneldor", "Minardil", "Minastan", "Mithrellas", "Morwen", "The Moth", "Mouth of Sauron", "Muzgash", "Míriel", "Mîm", "Narmacil I", "Narmacil II", "Nellas", "Nerdanel", "Nessa", "Nienna", "Nimloth (elf)", "Niënor", "Nob", "Náin I", "Númendil", "Olwë", "Ondoher Orchaldor", "Orcobal", "Ori", "Orodreth", "Orodreth (Steward)", "Oromë", "Oropher", "Orophin", "Ossë", "Ostoher", "Radagast", "River-woman", "Rogash", "Roäc", "Ruffian Leader", "Rumil", "Rómendacil I", "Rómendacil II", "Andwise Roper", "Rúmil", "Lobelia Sackville-Baggins", "Lotho Sackville-Baggins", "Sador", "Saeros", "Salmar", "Saruman", "Sauron", "Shadowfax", "Shagrat", "Shelob", "Silmariën", "Siriondil", "Smaug", "Sméagol", "Soronto", "Squint-eyed Southerner", "Morwen Steelsheen", "Robin Smallburrow", "Tar-Alcarin", "Tar-Aldarion", "Tar-Amandil", "Tar-Ancalimon", "Tar-Ancalimë", "Tar-Anárion", "Tar-Ardamin", "Tar-Atanamir", "Tar-Calmacil", "Tar-Ciryatan", "Tar-Elendil", "Tar-Meneldur", "Tar-Minastir", "Tar-Míriel -Tar-Palantir", "Tar-Súrion", "Tar-Telemmaitë", "Tar-Telperiën", "Tar-Vanimeldë", "Tarannon Falastur", "Tarcil", "Targon", "Tarondor", "Tata", "Telemnar", "Telumehtar", "Tevildo", "Thengel", "Thingol", "Thorin I", "Thorin II Oakenshield", "Thorin III Stonehelm", "Thorondir", "Thorondor", "Thranduil", "Thráin I", "Thráin II", "Thrór", "Théoden", "Théodred", "Tilion", "Tom, Bert, and William", "Tom Bombadil", "Adalgrim Took", "Bullroarer Took", "Adelard Took", "Goldilocks (Gardner) Took", "Peregrin Took", "Esmeralda Took", "Pimpernel Took", "Treebeard", "Tulkas", "Tuor", "Turambar", "Turgon", "Turgon (Steward)", "Two Watchers", "Túrin I", "Túrin II", "Túrin Turambar", "Daddy Twofoot", "Ulbar", "Uglúk", "Uinen", "Uldor", "Ulfang", "Ulfast", "Ulmo", "Ulrad", "Ulwarth", "Ungoliant", "Vairë", "Valacar", "Valandil", "Valandil of Andúnië", "Varda", "Vardamir Nólimon", "Vidugavia", "Vidumavi", "Vorondil the Hunter", "Voronwë", "Vána", "Vëantur", "Walda", "Wife of Barach", "Witch-king of Angmar", "Wulf", "Yavanna", "Zamîn"]
var nombresPlayersSTARW = ["Anakin Skywalker", "Anakin Solo", "Arren Kae", "Ask Aak", "Attichitcuk", "Ayy Vida", "Banda Max Rebo", "Bene", "Biggs Darklighter", "Bodo Baas", "Bossk", "Cade Skywalker", "Capitán Rex", "Carlist Rieekan", "Darra Thel-Tanis", "Centinelas de Byss", "Chalmun", "Charal", "Chewbacca", "Clone trooper", "Conde Dooku", "Cordé", "Crix Madine", "Darth Bane", "Darth Caedus", "Darth Malak", "Darth Maul", "Darth Plagueis", "Darth Vader", "Dash Rendar", "Demetrius Zaarin", "Diva Funquita", "Diva Shaliqua", "Djas Puhr", "Doda Bodonawieedo", "Dominus", "Dormé", "Durge", "Dutch Vander", "Ephant Mon", "Fang Zar", "Feltipern Trevagg", "Ferus Olin", "Jango Fett", "Boba Fett", "Finis Valorum", "Finn", "Firmus Piett", "Galen Marek", "Garm Bel Iblis", "Garven Dreis", "General Grievous", "General Rahm Kota", "Gilramos Libkath", "Gizor Dellso", "Greeata", "Greedo", "Gregar Typho", "Guardia Real del Emperador", "Han Solo", "Ikrit", "Jabba el Hutt", "Jamillia", "Jan Dodonna", "Jar Jar Binks", "Jek Porkins", "Jerjerrod", "Joh Yowza", "Jorus C'baoth", "Korven Winex", "Kren Blista-Vanee", "Kylo Ren", "Labashi-Marduk", "Lama Su", "Lando Calrissian", "Lobot", "Lord Oscuro", "Lowbacca", "Luke Skywalker", "Lumpawarrump", "Lunae Minx", "Líder Supremo Snoke", "Maris Brood", "Mas Amedda", "Max Rebo", "Maximilian Veers", "Meena Tills", "Miko Reglia", "Momaw Nadon", "Nien Nunb", "Nom Anor", "Nute Gunray", "Olee Starstone", "Orn Free Taa", "Ozzik Sturn", "Palpatine", "Panaka", "Passel Argente", "Poe Dameron", "Poggle el Menor", "Roan Shryne", "Rogwa Wodrata", "Roos Tarpals", "Roron Corobb", "Rosh Penin", "Rugor Nass", "Rune Haako", "Sabé", "San Hill", "Sar Labooda", "Sarrissa Jeng", "Satal Keto", "Saul Karath", "Sebulba", "Señor Oscuro de los Sith", "Shaak Ti", "Shu Mai", "Sidonra Diath", "Sifo-Dyas", "Shmi Skywalker", "Stormtrooper", "Talon Karrde", "Tarfful", "Tavion Axmis", "Tenel Ka", "Terak", "Thon", "Thrawn", "Tikkes", "Tion Medon", "Tru Veld", "Tsui Choi", "Ulic Qel-Droma", "Vergere", "Watto", "Wedge Antilles", "Wicket W. Warrick", "Wilhuff Tarkin", "XizorYuthura Ban", "Zez-Kai Ell", "Zsinj", "Zuckuss"]
var minutos, segundos; // Cadenas para ajustar plural y singular de segundos;
var ordenHS = 2; // 1 = tiempo, 2 = Puntuación
var topCuantos = 10; // Cuantas mejores puntuaciones quieres mostrar
tiempoMuestraCarta = 300; // Tiempo en milisegundos que se muestra la carta. Configurada por plugin.
muestraInicio = true; // False si no se quiere barrido al principio. Configurada por plugin.
posPlayerZone = ""; // Configurada con el plugin
fondoCarta = ""; // Configurada con el plugin
estilosCarta = ["cgreen", "cgray", "cblue", "cgold", "cpurple", "cred"]; // Colores para el fondo de cartas
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
  //TODO: Gestionar con un Service Worker de cacheo.
  var imagenes = ["startPulsado.png", "lArrBl.png", "rArrBl.png", "lArrRed.png", "rArrRed.png", "start.png", "close.png", 
                  "botonNombre.jpg", "botonGuardar.jpg", "botonEsla.jpg", "botonEslaOver.jpg", "botonStar.jpg", "botonStarOver.jpg", 
                  "stars.png", "configuration.png", "user.png", "logout.png", 
                  "muteGray.png", "playinGray.png", "tapete.jpg", "reversos2.jpg", 
                  "anversocarta.jpg", "cartaacertada.jpg", "burbOrange.png", "burbBlue.png", "burbOraRota.png", "burbBlueRota.png"];
  preload(imagenes);
  poblarJugadores();
  crearTablero(); // Muestro el tablero por primera vez
  // Si no se han aceptado aún las cookies se muestra modal, en caso contrario se pideNombre.
  if (Cookies.getJSON("aceptacookie") == undefined) {
    aceptarCookies();
  } else {
    pideNombre();
  }
  $(document).confCadaOveja(); // Ejecuto el plugin con las opciones por defecto.
  pista = setInterval(pistaIniciar, 6000);
});


function activaTeclaSBotonInicio() {
  $(document).on( {
    keydown: function(event){
      if ((event.key).toUpperCase() == "S" ) {
        iniJuegoEnsi();
      }
    }
  });
  $("#start").on({
    click: function() {
      iniJuegoEnsi();
    }
  });
}

function iniJuegoEnsi() {
  if (!enJuego) {
    // Desactivo el click en botón y la pulsación de tecla "S"
    $("#start").off("click");
    $(document).off("keydown");
    clearInterval(pista); // Elimino la pista de donde pulsar
    crearTablero(); // Limpio el tablero y muestro cartas.
    if (muestraInicio) { // Retardo para esperar que acabe el barrido de cartas inicial
      setTimeout(inicVar, retBarr*(numCartas+4)); 
    } else {
      inicVar(); // Si no hay barrido inicial de cartas
    }
  }  
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
  sonidoCarta = true;
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

function muestraCarta(carta, tMuestra, sonido = true) {
  carta.text(carta.attr("value"));
  carta.toggleClass("cartaMostrada");
  if (sonido) {reproduceSonido("card-flip.mp3")}
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
    reproduceSonido("fireworks.mp3");
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
  var burbuja = crearElemento(padre, "DIV", atributos);
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
  reproduceSonido("bubble.mp3");
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

function reproduceSonido(sonido, volumen = 1, loop = false, fondo = false) {
  var aud = document.createElement("audio");
  aud.setAttribute("src", "sonidos/" + sonido);
  if (fondo) {
    aud.setAttribute("id", "musicaFondo");
    aud.setAttribute("pista", pistaActual);
    document.body.appendChild(aud);
  }
  aud.volume = volumen;
  aud.loop = loop;
  aud.play();
}

function ocultaCarta(carta) {
  //if (sonidoCarta) reproduceSonido("dealing-card.mp3");  
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

  if ($("body").children().length == 0) { // Inicio del juego. No existe el tablero.
    var padre = $("body");
    var atributos = {id: "container"};
    var container = crearElemento(padre, "DIV", atributos);
    // Div para player y logout
    atributos = {id: "jugDat"};
    crearElemento(padre, "DIV", atributos);
    // Div para marcador e info
    atributos = {id: "marcador"};
    var marcador = crearElemento(container, "DIV", atributos);
    crearMarcador();
    // Creamos el tapete para las cartas
    atributos = {id: "tablero", class: "tableroInicioFin"};
    var tablero = crearElemento(container, "DIV", atributos);
    tablero.html(mensajeInicio);
    //muestraHS(ordenHS);
    atributos = {id:"foot"};
    var foot = crearElemento(container, "FOOTER", atributos);
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
  var punts = crearElemento(padre, "DIV", atributos);
  atributos = {class: "gloria titulo"};
  crearElemento(punts, "h2", atributos, "Puntos");
  atributos = {id: "puntos", class: "gloria"};
  crearElemento(punts, "p", atributos, "0");
  // DIV Centro
  atributos = {id: "botonStart"};
  var start = crearElemento(padre, "DIV", atributos);
    // Div superior para botones
      atributos = {id: "startSup"};
      var startSup = crearElemento(start, "DIV", atributos);
    // Div inferior, para mensaje de texto
      atributos = {id: "startInf"};
      var startInf = crearElemento(start, "DIV", atributos);
  // DIV Botón
  atributos = {
    id: "start",
    src: "images/start.png",
    title: "Haz clic para Iniciar"
  };
  var botStart = crearElemento(startSup, "img", atributos);
  // DIV Tiradas
  atributos = {id: "tiradas"};
  var tiradas = crearElemento(padre, "DIV", atributos);
  atributos = {class: "gloria titulo"};
  crearElemento(tiradas, "h2", atributos, "Tiradas");
  atributos = {id: "numTiradas", class: "gloria"};
  crearElemento(tiradas, "p", atributos, "0");
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
    // Si muestraInicio = true. Barrido de cartas. Después de crear las cartas se muestran durante 0.1 segundos. 
    if (muestraInicio) {
        setTimeout(muestraCarta, retBarr*i, $("#c"+i), retBarr, false);
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
  muestraHS(ordenHS);
  setTimeout(function() { // Vuelvo al mensaje de Inicio
    tablero.empty().html(mensajeInicio);
  }, 15000);
  $("#start").attr("src", "images/start.png");

  pista = setInterval(pistaIniciar, 6000);
  activaTeclaSBotonInicio();
  playerZone();
}

// Muestra High Scores
function muestraHS(orden) {
  $(document).off("keydown"); // Desactivo la pulsación de la tecla S.
  var padre = $("#tablero");
  padre.empty();
  var atributos = {id: "hS"};
  var contHS = crearElemento(padre, "DIV", atributos);
  contHS.css("top", padre.height());

  var txt = "<h2>High Scores TOP "+ topCuantos + "</h2>";
  // Crea listado
      var listado = Cookies.getJSON();
      var hS = [];
      for (i in listado) {
        if (i.toLowerCase() != "conf" && i.toLowerCase() != "aceptacookie" && i.toLowerCase() != "n1") { // Elimina la cookie de configuración y de control
          var nombre = i;
          var tiempo = new Date(listado[i].tiempo);
          var puntos = listado[i].puntos;
          hS.push([nombre, tiempo, puntos]);
        }
      }

      function eliminaVacios() { // Elimino los jugadores que nunca terminaron una partida.
        for (var i = 0; i<hS.length; i++) {
          if (hS[i][1].toLocaleTimeString() == "1:00:00") {
            hS.splice(i, 1);
            i--;
          }
        }
      }

      eliminaVacios();
      (orden == 1) ? hS.sort(ordenarTiempos): hS.sort(ordenarPuntos);
      txt += "<span class='nombreHS tituloHS'>Jugador</span><span class='tiempoHS tituloHS'>Tiempo</span><span class='puntosHS tituloHS'>Puntos&nbsp;&nbsp;</span>";
      if (hS.length <= topCuantos) topCuantos = hS.length; 
      
      crearHighScore(topCuantos);
      function crearHighScore(topCuantos) {
        for (var i = 0; i<topCuantos; i++) {
          var claseEsp = (nombreJugador == hS[i][0])? " nJHS": "";
          txt += "<span class='nombreHS" + claseEsp + "'>" + hS[i][0] + "</span><span class='tiempoHS" + claseEsp + "'>" + hS[i][1].toLocaleTimeString() + "</span><span class='puntosHS" + claseEsp + "'>" + hS[i][2] + "</span><br class='limpia' />"; 
        }
      }

      function ordenarPuntos(a,b) {
        return b[2] - a[2];
      }

      function ordenarTiempos(a, b) {
        return a[1] - b[1];
      }

  contHS.html(txt);
  contHS.animate({
    top: -650
  }, 12000, function() {
              if (!enJuego) {
                $("#tablero").empty().html(mensajeInicio); // Borro el contenido de tablero y vuelvo a mostrar el mensaje de inicio
                activaTeclaSBotonInicio();
              }
            });
}


// Pedir nombre.
function pideNombre() {
  var salirModal = function () {
    reproduceSonido("click.mp3");
    guardaDatos(nombreJugador, tiempoNewPlayer, 0);
    $('#popup').fadeOut('slow');
    $('.popup-overlay').fadeOut('slow');
    blurElement($("#container"), 0);
    $("#popup, .popup-overlay").remove();
    activaTeclaSBotonInicio();
    playerZone();
  }

  if (Cookies.getJSON(nombreJugador) == undefined) {
    // Crea el div para la ventana modal
    var padre = $("body");
    var valid = /^[a-zA-ZáéíóúÁÉÍÓÚÑñ]{3,16}$/;
    var atributos = {id: "popup"};
    var modal = crearElemento(padre, "DIV", atributos);
    atributos = {class: "popup-overlay"};
    crearElemento(padre, "DIV", atributos);
    modal.html("<div class='content-popup'>" +
                  "<div class='close'>" + 
                    "<a href='#' id='close'><img id='closBt' src='images/close.png' /></a>" +
                  "</div>" +
                  "<div>" +
                    "<h2>Nombre del Jugador</h2>" +
                    "<input type='text' id='iNombre'><br/>" +
                    "<input type='image' id='bNombre' src='images/botonNombre.jpg'>" +
                    "<input type='image' id='bNombreESLA' src='images/botonEsla.jpg'>" +
                    "<input type='image' id='bNombreSTARW' src='images/botonStar.jpg'><br/>" +
                    "<span>Pasa el ratón por cada botón para conocer su efecto</span>" +
                  "</div>" +
                "</div>");
    blurElement("#container", 5); 
    $("#popup").fadeIn("slow");
    var fondo = $(".popup-overlay");
    fondo.fadeIn("slow");
    fondo.height($(window).height());
    $("#iNombre").on ({
      focus: function () {
        $("#bNombre").attr("src", "images/botonGuardar.jpg");
      },
      blur: function () {
        $("#bNombre").attr("src", "images/botonNombre.jpg");
      }
    });
    $("#iNombre").focus();
    $("#bNombre").on ({
      mouseover: function () {
        $(this).parent().children(":last-child").text("Usa este botón para usar un nombre escrito por ti");
        $(this).attr("src", "images/botonGuardar.jpg");
        reproduceSonido("over.mp3");
      }, 
      mouseout: function () {
        $(this).parent().children(":last-child").text("Pasa el ratón por cada botón para conocer su efecto");
        $(this).attr("src", "images/botonNombre.jpg");
      }, 
      click: function () {
        var nombreInt = $("#iNombre").val();
        if (nombreInt != "" && (valid.test(nombreInt))) {
          nombreJugador = $("#iNombre").val().toUpperCase();
          salirModal();
        } else {
          $("#iNombre").focus();
        }      
      }
    });
      /* Si en la ventana modal se pulsa Nombre ESLA o STARWAR y el valor de nombreJugador es "PY1UNN", 
      se escoge un nombre aleatorio y se crea la cookie. 
      */
    $("#bNombreESLA").on ({
      mouseover: function () {
        $(this).parent().children(":last-child").text("Usa este botón para usar un nombre del Señor de los Anillos");
        $(this).attr("src", "images/botonEslaOver.jpg");
        reproduceSonido("over.mp3");
      }, 
      mouseout: function () {
        $(this).parent().children(":last-child").text("Pasa el ratón por cada botón para conocer su efecto");
        $(this).attr("src", "images/botonEsla.jpg");
      },       
      click: function () {
        if (nombreJugador == "PY1UNN") nombreJugador = nombresPlayersESLA[Math.floor(Math.random()*nombresPlayersESLA.length)].toUpperCase();
        salirModal();
      }
    });
    $("#bNombreSTARW").on ({
      mouseover: function () {
        $(this).parent().children(":last-child").text("Usa este botón para usar un nombre de Star Wars");
        $(this).attr("src", "images/botonStarOver.jpg");
        reproduceSonido("over.mp3");
      }, 
      mouseout: function () {
        $(this).parent().children(":last-child").text("Pasa el ratón por cada botón para conocer su efecto");
        $(this).attr("src", "images/botonStar.jpg");
      },             
      click: function () {
        if (nombreJugador == "PY1UNN") nombreJugador = nombresPlayersSTARW[Math.floor(Math.random()*nombresPlayersSTARW.length)].toUpperCase();
        salirModal();
      }
    });
    $("#close, .popup-overlay").on ({
      click: function () {
        if (nombreJugador == "PY1UNN") nombreJugador = nombresPlayersESLA[Math.floor(Math.random()*nombresPlayersESLA.length)];
        salirModal();
      }    
    });
  } else {
    activaTeclaSBotonInicio();
    playerZone();
  }
}

function playerZone() {
  var coo = Cookies.getJSON(nombreJugador);
  var tiempoJug = new Date(coo.tiempo);
  var puntosJug = coo.puntos;
  var padre = $("#jugDat");
  var imgclass = "star1";
  if ($("#puntos").text() > 30) imgclass = "star2";
  if ($("#puntos").text() > 50) imgclass = "star3";
  if ($("#puntos").text() > 70) imgclass = "star4";
  if ($("#puntos").text() > 90) imgclass = "star5";
  padre.empty();
  padre.html("<div><img id='config' src='images/configuration.png' title='Configuración'/></div>" +
             "<div><img src='images/user.png' title='Nombre Usuario'/><br/>" + nombreJugador +"</div>" +

             "<div><img src='images/clock.png' title='Mejor Tiempo'/><br/>" + tiempoJug.toLocaleTimeString() + "</div>" +
             "<div><img src='images/trans.gif' class='"+ imgclass + "' title='Mejor Puntuación'/><br/>" + puntosJug + " puntos</div>" +
             "<div><img id='logout' src='images/logout.png' title='Logout'/>");
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
        formConfiguracion();
      }
    }); 
}

function formConfiguracion() {
  var padre = $("body");
  var atributos = {id: "popupcf"};
  var modal = crearElemento(padre, "DIV", atributos);
  atributos = {class: "popup-overlay"};
  crearElemento(padre, "DIV", atributos);
  modal.html("<div class='content-popupcf'>" +
                "<div class='close'>" + 
                  "<a href='#' id='close'><img id='closBt' src='images/close.png' /></a>" +
                "</div>" +
                "<div>" +
                  "<h2>Opciones de configuración</h2>" +
                  "<fieldset id='colorCartaCf'><legend>Color Carta</legend>" +
                    "<img src='' />" +
                    "<input type='radio' name='radColCarta' value='cgreen'>Verde<br/>" +
                    "<input type='radio' name='radColCarta' value='cgray'>Gris<br/>" +
                    "<input type='radio' name='radColCarta' value='cblue'>Azul<br/>" +
                    "<input type='radio' name='radColCarta' value='cgold'>Dorado<br/>" +
                    "<input type='radio' name='radColCarta' value='cpurple'>Púrpura<br/>" +
                    "<input type='radio' name='radColCarta' value='cred'>Rojo" +
                  "</fieldset>" +
                  "<fieldset id='posConf'><legend>Posición Config.</legend>" +
                    "<input type='radio' name='posBarraConf' value='left'>Izquierda" +
                    "<input type='radio' name='posBarraConf' value='right'>Derecha<br/>" +
                  "</fieldset>" +
                  "<div id='enviaConf' >" +
                    "<input type='button' id='gConf' value='Guardar' />" +
                  "</div>" +
                  "<fieldset id='valRetCarta'><legend>Tiempo muestra cartas</legend>" +
                    "<input id='rangTmp' type='range' value='0' step='50' min='300' max='1500'>" +
                    "<span id='rangSpan'></span>" +
                  "</fieldset>" +
                  "<div id='chkMuestraInicio' >" +
                    "<input type='checkbox' name='showStart' " +
                            "value='true'>Muestra cartas al iniciar el juego" +
                  "</div>" +
                  "<div id='cancionFondo' >Música de Fondo: " +
                    "<select id='selCancion'>" +
                    "</select>" +
                  "</div>" +
                "</div>" +
              "</div>");
  // Valores iniciales se obtienen de la configuración actual
    // Color baraja cartas actual
    $("input[name='radColCarta'").each ( function () {
        if ($(this).attr("value") == fondoCarta) {
          $(this).attr("checked", "checked");
          $(this).siblings("img").addClass($(this).attr("value"));
        }
    });
    // Posición actual barra configuración
    $("input[name='posBarraConf']").each ( function () {
        if ($(this).attr("value") == posPlayerZone) {
          $(this).attr("checked", "checked");
        }
    });
    // Estado del barrido inicial de cartas
    $("input[name='showStart']").each ( function () {
        if (muestraInicio) {
          $(this).attr("checked", "checked");
        }
    });

    // Estado del range del tiempo de muestra de las cartas. Muestra milisegundos
    var rT = $("#rangTmp");
    rT.attr("value", tiempoMuestraCarta);
    $("#rangSpan").text(rT.val() + " mseg.");
    // Actualización del range de tiempo
    rT.on ({
      change: function() {
        var valorActual = $(this).val() + " mseg.";
        $("#rangSpan").text(valorActual);
      }
    });

    // Opciones de música de fondo y establecimiento de la actual.
    var sel = $("#selCancion");
    for (var i = 0; i<canciones.length; i++) {
      // Si la pistaActual coincide con la opción que se crea se pone como seleccionada.
      (i == pistaActual) ? atributos = {value: musicaFondo[i], selected: true} : atributos = {value: musicaFondo[i]};
      var opt = crearElemento(sel, "OPTION", atributos, canciones[i]);
    }

    // Cambio de la imagen de la carta si se cambia el radio Button
    $("input[name='radColCarta']").on ({
      click: function() {
        $(this).siblings("img").removeClass().addClass($(this).attr("value"));
      }
    });

  blurElement("#container", 5); 
  $("#popupcf").fadeIn("slow");
  var fondo = $(".popup-overlay");
  fondo.fadeIn("slow");
  fondo.height($(window).height());
  $("#gConf").on ({
    click: function() {
      var bkCarta = $(':radio[name="radColCarta"]:checked').attr("value");
      var posBrCfg = $(':radio[name="posBarraConf"]:checked').attr("value");
      var ckStart = ($(':checkbox[name="showStart"]')[0].checked);
      var tmpCarta = $("#rangTmp").val();
      var pistaSel = $("#selCancion").prop('selectedIndex');
      $(document).confCadaOveja({
          fondoCarta: bkCarta,
          posPlayerZone: posBrCfg,
          muestraInicio: ckStart,
          tiempoMuestraCarta: tmpCarta,
          pistaActual: pistaSel
      });
      $('#popupcf').fadeOut('slow');
      $('.popup-overlay').fadeOut('slow');
      blurElement($("#container"), 0);
      $("#popupcf, .popup-overlay").remove();
    }
  });
    $("#close, .popup-overlay").on ({
      click: function () {
          $('#popupcf').fadeOut('slow');
          $('.popup-overlay').fadeOut('slow');
          blurElement($("#container"), 0);
          $("#popupcf, .popup-overlay").remove();
          activaTeclaSBotonInicio();
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

// Mute o sonido de la música de fondo

function pausaPlay() {
  var mF = document.getElementById("musicaFondo");
  if (mF.paused) {
    $("#speaker").attr("src", "images/playinGray.png");
    mF.play();
  } else {
    $("#speaker").attr("src", "images/muteGray.png");
    mF.pause();    
  }
}

// Para mostrar strings de tiempo

function ajustaCadenaTiempo() {
  minutos = (tiempo.getMinutes() != 1 ? "minutos": "minuto");
  segundos = (tiempo.getMinutes() != 1 ? "segundos": "segundo");
}

// Función para simplificar la creación de elementos DOM
function crearElemento(idPadre, tipo, tipoValorAttr, text = "") {
  var hijo = $("<" + tipo + "/>");
  hijo.attr(tipoValorAttr);
  hijo.text(text);
  idPadre.append(hijo);
  return hijo;
}

// FUNCIONES RELACIONADAS CON COOKIES

// Guarda los datos del jugador en su cookie

function guardaDatos(nombreJugador, tiempo, puntos, continua = true) {
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
  if (continua) playerZone();
}

// La primera vez que se juega se crean 10 jugadores (nombre, puntuación y tiempo aleatorios). Además se crea cookie de control n1.
function poblarJugadores(num = 10) {
  if (Cookies.get("n1") == undefined) {
    for (var i= 0; i<num; i++) {
      var tmp = tiempoNewPlayer.setSeconds(tiempoNewPlayer.getSeconds() + Math.ceil(Math.random()*100));
      guardaDatos(nombresPlayersESLA[Math.floor(Math.random()*nombresPlayersESLA.length)].toUpperCase(), tmp, Math.ceil(Math.random()*120), false);
    }
  }
  guardaDatos("n1",tmp, Math.ceil(Math.random()*120), false);
  tiempoNewPlayer.setTime(0);
}

// PRELOADS DE IMÁGENES

function preload(imageArray, index) {
        index = index || 0;
        if (imageArray && imageArray.length > index) {
            var img = new Image ();
            img.onload = function() {
                preload(imageArray, index + 1);
            }
            img.src = "images/" + imageArray[index];
        }
}

// ACEPTACION LEGAL DE COOKIES

function aceptarCookies() {
    // Crea el div para la ventana modal
    var padre = $("body");
    var atributos = {id: "popupCook"};
    var modal = crearElemento(padre, "DIV", atributos);
    atributos = {class: "popup-overlay"};
    crearElemento(padre, "DIV", atributos);
    modal.html("<div class='content-popupCook'>" +
                  "<div>" +
                    "<h2>Política de cookies</h2>" +
                    "<p>" + politicaCookies + "</p>" +
                    "<input type='button' id='siCookie' value='Acepto' />" +
                  "</div>" +
                "</div>");
    blurElement("#container", 5); 
    $("#popupCook").fadeIn("slow");
    var fondo = $(".popup-overlay");
    fondo.fadeIn("slow");
    fondo.height($(window).height());
    $("#siCookie").on ({
      click: function () {
        reproduceSonido("click.mp3");
        $('#popupCook').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        blurElement($("#container"), 0);
        Cookies.set("aceptacookie", true, { expires: 1000, path: ''});
        $("#popupCook, .popup-overlay").remove();
        pideNombre();
      }
    });
}