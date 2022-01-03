function cargarListadoTurnos(){
$.ajax({
    url: "/turno/list",
    type: "GET",
    data: {}
  })
    .done(function(res) {
        listado=res;
    }).fail(function(data) {
            alert("error");
          })
          .always(function(data) {
            //alert("complete");
          });
        };