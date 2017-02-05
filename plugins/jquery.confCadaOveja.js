jQuery.fn.confCadaOveja = function(parametros) {
   var conf = {
      posPlayerZone: "right", // left or rigth
      muestraInicio: true, // true or false
      tiempoMuestraCarta: 500, // milisegundos que se muestra cada carta
      fondoCarta: "cblue" // color del anverso de cada carta
   }

   jQuery.extend(conf, parametros);

      posPlayerZone = conf.posPlayerZone;
      $("#jugDat").css(conf.posPlayerZone, "15px"); // si ya está mostrada la zona de Info del Jugador.
      muestraInicio = conf.muestraInicio;
      tiempoMuestraCarta = conf.tiempoMuestraCarta;
      fondoCarta = conf.fondoCarta;

      var estilosCarta = ["cgreen", "cgray", "cblue", "cgold", "cpurple", "cred"];
      if (enJuego) {
         $(".carta").each(function (){
            $(this).removeClass(estilosCarta.join(" ")).addClass(conf.fondoCarta);
         });
      }

   return this;
}; 