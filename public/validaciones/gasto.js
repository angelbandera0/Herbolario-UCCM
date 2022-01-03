var errors = new Array();
function validar_campos(fi,ff,pr,errorL,aqui) {
  errors = new Array();
  let fechaini = new Date($(fi).val());
  let fechafin = new Date($(ff).val());
  let diasdif = fechafin.getTime() - fechaini.getTime();
  let brecha = Math.round(diasdif / (1000 * 60 * 60 * 24));

  
    if (fechaini.getFullYear() != fechafin.getFullYear()) {
      errors.push("Los años de las fechas no coinciden.");
    }
    if (fechaini.getMonth() != fechafin.getMonth()) {
      errors.push("Los meses de las fechas no coinciden.");
    }
    if (brecha != 1) {
      errors.push("Existe mas de un dia de diferencia entre las fechas.");
    }
    if (($(pr).val()*1)<=0) {
      
      errors.push("El precio no puede ser menor que 0 ni igual a el");
    }
    console.log(errors.length);
  if (errors.length != 0) {
    $(errorL).removeAttr('hidden');
    crearListaErrores("#lista", errors,aqui)
    return false;
  } else {
    return true;
  }

}
function crearListaErrores(id_lista, errors,aqui) {
  $('#lista').remove();
  $(aqui).after('<ul id="lista"></ul>');
  for (let i = 0; i < errors.length; i++) {
    $(id_lista).append("<li>-" + errors[i] + "</li>");
  }
}
