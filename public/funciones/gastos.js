
      function generarClickAuto(obj) {
        $(obj).click(function() {});
        $(obj).click();
      };

      $("#causa_add").change(() => {
        let select_item = $("#causa_add").val();
        if (select_item == "Pago de" || select_item == "Compra de" || select_item == "Salario de") {
          $("#motivo_add").removeAttr("disabled");
        } else {
          $("#motivo_add").val("");
          $("#motivo_add").attr("disabled", "true");
        }
      });
      $("#causa_upd").change(() => {
        let select_item = $("#causa_upd").val();
        if (select_item == "Pago de" || select_item == "Compra de" || select_item == "Salario de") {
          $("#motivo_upd").removeAttr("disabled");
        } else {
          $("#motivo_upd").val("");
          $("#motivo_upd").attr("disabled", "true");
        }
      });
      function ventana(elemento) {
        let id =
          elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes[1].textContent;

        swal(
          {
            title: "¿Estas seguro de esta accion?",
            text: "Una vez eliminado dicho gasto no se puede recuperar",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Aceptar",
            closeOnConfirm: true
          },
          function() {            
            deleteGasto(id);
            noty("Gasto eliminado correctamente", "success");
          }
        );
      }

      function editar(elemento) {
        let fila =
          elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
        let id = fila[1].textContent;
        //inicio de cargar elementos al modal
        let data = {
          causa: fila[2].textContent,
          precio: fila[3].textContent,
          fecha_i: fila[4].textContent,
          fecha_f: fila[5].textContent
        };
        let aux = String(data.causa);
        let arr = new Array();
        if (aux.includes("Compra de") || aux.includes("Pago de") || aux.includes("Salario de")) {
          arr = aux.split(" ");
          let cadena = arr
            .slice(2, arr.length)
            .join()
            .replace(/[,]/gi, " ");
          $("#causa_upd").val(arr[0] + " " + arr[1]);
          $("#motivo_upd")
            .val(cadena)
            .removeAttr("disabled");
        } else {
          $("#causa_upd").val(String(data.causa).trim());
          $("#motivo_upd")
            .val("")
            .attr("disabled", true);
        }
        $("#precio_upd").val(data.precio);
        $("#a_ini_upd").val(data.fecha_i);
        $("#a_fin_upd").val(data.fecha_f);
        //fin de cargar elementos al modal
        $("#update-gasto").attr("action", "/gasto/update/" + id);
      }
      function detalles(elemento) {
        let fila =
          elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
        let id = fila[1].textContent;
        detallesGasto(id);    
      };

      function mostrarAnnos(sel_annos) {
        for(let i=0;i<sel_annos.length;i++){
            $('#sel-annos').append('<option>'+sel_annos[i]+'</option>')
            $('#sel-annos-causas').append('<option>'+sel_annos[i]+'</option>')

        }
      };
      $("#sel-meses,#sel-annos").change(() => {
          let mes = $("#sel-meses").val();
          let anno = $("#sel-annos").val();
          let fe=moment(anno+"-"+mes+"-01");
          chartFechaMes(mes,anno,fe.format("MMMM")+" del "+anno+":");
      });
      $("#sel-annos-causas").change(() => {
          let anno = $("#sel-annos-causas").val();
            $("#all-causas").remove();
            $("#aqui").append('<div id="all-causas" style="height:400px"></div>');
          chartCausaAnnos(anno);
      });
      /*****Mod fechas auto add*****/
      $("#a_ini").change(() => {
          let date = $("#a_ini").val();
          $("#a_fin").val(moment(date).add(1,'days').format("YYYY-MM-DD"));
      });
      $("#a_fin").change(() => {
          let date = $("#a_fin").val();
          $("#a_ini").val(moment(date).subtract(1,'days').format("YYYY-MM-DD"));
      });
      /*****Mod fechas auto upd*****/
      $("#a_ini_upd").change(() => {
          let date = $("#a_ini_upd").val();
          $("#a_fin_upd").val(moment(date).add(1,'days').format("YYYY-MM-DD"));
      });
      $("#a_fin_upd").change(() => {
          let date = $("#a_fin_upd").val();
          $("#a_ini_upd").val(moment(date).subtract(1,'days').format("YYYY-MM-DD"));
      });
