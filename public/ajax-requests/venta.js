var lista;

$("#add-venta").submit(function (event) {
    if (true/*validar_campos("#a_ini", "#a_fin", "#precio", "#errores", "#aqui")*/) {
        event.preventDefault();
        let url = $(this).attr("action");
        let method = $(this).attr("method");
        let data = $(this).serialize();
        console.log(url,data,method);
        $.ajax({
            url: url,
            type: method,
            data: data
        })
            .done(function (res) {
                //cargarProductos();
                mytable.ajax.reload();
                generarClickAuto("#close");
                //recargarSinParametros();
                noty("Venta adicionada correctamente", "success");
            })
            .fail(function (res) {
            })
            .always(function (res) {
            });
    } else {
        return false;
    }
});

$("#update-venta").submit(function (event) {
    if (true/*validar_campos("#a_ini_upd", "#a_fin_upd", "#precio_upd", "#errores_upd", "#aqui_upd")*/) {
        event.preventDefault();
        let url = $(this).attr("action");
        let method = $(this).attr("method");
        let data = $(this).serialize();
        $.ajax({
            url: url,
            type: method,
            data: data
        })
            .done(function (res) {
                generarClickAuto("#close-ed");
                mytable.ajax.reload();
                //recargarSinParametros();
                noty("Venta actualizada correctamente", "success");
            })
            .fail(function (res) {
                noty("No se pudo realizar la actualización de dicho gasto producto a un error", "danger");
            })
            .always(function (res) {
            });
    } else {
        return false;
    }
});

function deleteVenta(id) {
    $.ajax({
        url: "/venta/delete/" + id,
        type: "POST",
        data: {}
    })
        .done(function (res) {
            mytable.ajax.reload();
        })
        .fail(function (res) {
            noty("No se pudo realizar la eliminación de dicha compra producto a un error", "danger");
        })
        .always(function (res) {
        });
};

function detallesVenta(id) {
    $.ajax({
        url: "/venta/get/" + id,
        type: "GET",
        data: {}
    })
        .done(function (res) {
            let venta = res.venta;
            $("#g_id").text(venta.id);
            $("#producto").text(venta.producto_asociado.nombre);
            $("#productord").text(venta.productor_asociado.nombre);
            $("#cantidad-d").text(venta.cantidadv);
            $("#precio-d").text(venta.precio);
            $("#d1").text(moment(venta.turno_asociado.fecha_inicio).format("DD-MMMM-YYYY"));
            $("#d2").text(moment(venta.turno_asociado.fecha_fin).format("DD-MMMM-YYYY"));
            $("#g_add").text(moment(venta.createdAt).fromNow());
            $("#g_upd").text(moment(venta.updatedAt).fromNow());


        })
        .fail(function (res) {
            noty("No se pudo realizar la eliminación de dicho gasto producto a un error", "danger");
        })
        .always(function (res) {
        });
};


function cargarInfoAnnoMeses() {

    $.ajax({
        url: "gasto/allAnnos",
        type: "POST",
        data: {}
    })
        .done(function (result) {

            mostrarAnnos(result.annos);
            chart_annos(result.annos, result.data,'bar');

        })
        .fail(function (res) {
        })
        .always(function (res) {
        });

};
function chartFechaMes(mes,anno,fecha) {
    $.ajax({
        url: "gasto/fecha",
        type: "POST",
        data: {"mes":mes,"anno":anno}
    })
        .done(function (result) {
            chart_mes(result.legend, result.select,result.data,fecha);

        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};
function chartCausaAnnos(anno,agrupado) {
    $.ajax({
        url: "gasto/allCausas",
        type: "POST",
        data: {"anno":anno}
    })
        .done(function (result) {
            chart_causas(result.legend,result.data,agrupado);

        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};
function datosVenta(id) {
    $.ajax({
        url: "venta/listByIdProducto/"+id,
        type: "GET",
        data: {}
    })
        .done(function (r) {

            /*let t=($("#compradoss tbody"))
                        console.log(t);
                        if(t[0].childElementCount!=0){
                            while (t[0].childElementCount>=1){
                                //console.log(ele[0].length);
                                (t[0].firstChild).remove();
                            }
                        }
                        console.log(r.compra)
                        r.compra.forEach((e)=>{
                            t.append(`<tr>
            <td>`+e.producto_asociado.nombre+`</td>
            <td>`+e.productor_asociado.nombre+`</td>
            <td>`+e.costo+`</td>
            <td>`+e.cantidadc+`</td>
            <td>`+e.turno_asociado.fecha_inicio+`</td>
            <td>`+e.turno_asociado.fecha_fin+`</td>

            </tr>`)
                        })*/
            ventatable.clear().rows.add(r.venta).draw();

        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};


