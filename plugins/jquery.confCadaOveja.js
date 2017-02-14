jQuery.fn.confCadaOveja = function(parametros) {
   var conf = {
      posPlayerZone: "right", // left or rigth
      muestraInicio: true, // true or false
      tiempoMuestraCarta: 500, // milisegundos que se muestra cada carta
      fondoCarta: "cred", // color del anverso de cada carta
      pistaActual: 2 // Pista por defecto música de fondo.
   }

   jQuery.extend(conf, parametros);

      // Actualizo variables con los valores pasados por el plugin.
      posPlayerZone = conf.posPlayerZone; 
      muestraInicio = conf.muestraInicio;
      tiempoMuestraCarta = conf.tiempoMuestraCarta;
      fondoCarta = conf.fondoCarta;
      // Música fondo
      var mf = $("#musicaFondo");
      // Ya está sonando una canción y no es la misma que se quiere configurar
      if (pistaActual != "" && mf.attr("pista") != conf.pistaActual) {
         mf.remove();
      }
      if (mf.attr("pista") != conf.pistaActual) {
         pistaActual = conf.pistaActual;
         // Reproduzco la canción seleccionada en pistaActual;
         $("audio").remove();
         reproduceSonido(musicaFondo[pistaActual], 1, true, true);
      }
      $("#foot").html(copyright + sonando[pistaActual] + ctrlSonido );
      $("#speaker").on("click", pausaPlay);
      var confBloque = $("#jugDat");
      confBloque.removeClass(); // Elimino las clases que pudiera tener asignadas.
      (posPlayerZone == "right") ? confBloque.addClass("right") : confBloque.addClass("left");

      if (enJuego) {
         $(".carta").each(function (){
            $(this).removeClass(estilosCarta.join(" ")).addClass(conf.fondoCarta);
         });
      }

   return this;
}; 