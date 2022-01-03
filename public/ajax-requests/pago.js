var lista;

$("#add-pago").submit(function (event) {
    if (true) {
        event.preventDefault();
        let url = $(this).attr("action");
        let method = $(this).attr("method");
        let data = $(this).serialize()+"&productor_nuevo="+$("input#productor.form-control.add").val();
        console.log(data);
        $.ajax({
            url: url,
            type: method,
            data: data
        })
            .done(function (res) {
                generarClickAuto("button#cerr.close.add");
                productor_listado(false);

                //recargarSinParametros();
                noty("Pago adicionado correctamente", "success");
            })
            .fail(function (res) {
            })
            .always(function (res) {
            });
    } else {
        return false;
    }
});

$("#edit-pago").submit(function (event) {
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

                productor_listado(false);
                datosPago(res.pago.id_productor);
                cambio('#edit_p','#tabla_pagos');
                // vaciarSelects()
               // generarClickAuto("#close-ed");
               // mytable.ajax.reload();
                //recargarSinParametros();
                noty("Pago actualizado correctamente", "success");
            })
            .fail(function (res) {
                noty("No se pudo realizar la actualización de dicho pago producto a un error", "danger");
            })
            .always(function (res) {
            });
    } else {
        return false;
    }
});

function deletePago(id) {
    $.ajax({
        url: "/pago/delete/" + id,
        type: "POST",
        data: {}
    })
        .done(function (res) {
            productor_listado(false);
            datosPago(ay);
            cambio('#delete_p','#tabla_pagos');
            noty("Pago eliminado correctamente", "success");

        })
        .fail(function (res) {
            noty("No se pudo realizar la eliminación de dicho pago producto a un error", "danger");
        })
        .always(function (res) {
        });
};

function detallesCompra(id) {
    $.ajax({
        url: "/compra/get/" + id,
        type: "GET",
        data: {}
    })
        .done(function (res) {
            let compra = res.compra;
            $("#g_id").text(compra.id);
            $("#producto").text(compra.producto_asociado.nombre);
            $("#productor").text(compra.productor_asociado.nombre);
            $("#cantidad-d").text(compra.cantidadc);
            $("#costo-d").text(compra.costo);
            $("#valor-total").text(compra.cantidadc*compra.costo)
            $("#d1").text(moment(compra.turno_asociado.fecha_inicio).format("DD-MMMM-YYYY"));
            $("#d2").text(moment(compra.turno_asociado.fecha_fin).format("DD-MMMM-YYYY"));
            $("#g_add").text(moment(compra.createdAt).fromNow());
            $("#g_upd").text(moment(compra.updatedAt).fromNow());

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

function datosPago(id) {
    $.ajax({
        url: "pago/listByIdProductor/"+id,
        type: "GET",
        data: {}
    })
        .done(function (r) {
            pagotable.clear().rows.add(r.pago).draw();
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


