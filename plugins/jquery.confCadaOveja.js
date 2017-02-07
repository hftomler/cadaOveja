jQuery.fn.confCadaOveja = function(parametros) {
   var conf = {
      posPlayerZone: "right", // left or rigth
      muestraInicio: true, // true or false
      tiempoMuestraCarta: 500, // milisegundos que se muestra cada carta
      fondoCarta: "cred" // color del anverso de cada carta
   }

   jQuery.extend(conf, parametros);

      // Actualizo variables con los valores pasados por el plugin.
      posPlayerZone = conf.posPlayerZone; 
      muestraInicio = conf.muestraInicio;
      tiempoMuestraCarta = conf.tiempoMuestraCarta;
      fondoCarta = conf.fondoCarta;
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