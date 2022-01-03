var lista;

$("#add-gasto").submit(function (event) {
    if (validar_campos("#a_ini", "#a_fin", "#precio", "#errores", "#aqui")) {
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
                mytable.ajax.reload();
                generarClickAuto("#close");
                //recargarSinParametros();
                noty("Gasto adicionado correctamente", "success");
            })
            .fail(function (res) {
            })
            .always(function (res) {
            });
    } else {
        return false;
    }
});

$("#update-gasto").submit(function (event) {
    if (validar_campos("#a_ini_upd", "#a_fin_upd", "#precio_upd", "#errores_upd", "#aqui_upd")) {
        event.preventDefault();
        let url = $(this).attr("action");
        let method = $(this).attr("method");
        let data = $(this).serialize();
        console.log(url);
        $.ajax({
            url: url,
            type: method,
            data: data
        })
            .done(function (res) {
                generarClickAuto("#close-ed");
                mytable.ajax.reload();
                //recargarSinParametros();
                noty("Gasto actualizado correctamente", "success");
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

function deleteGasto(id) {
    $.ajax({
        url: "/gasto/delete/" + id,
        type: "POST",
        data: {}
    })
        .done(function (res) {
            //recargarSinParametros();
            mytable.ajax.reload();
        })
        .fail(function (res) {
            noty("No se pudo realizar la eliminación de dicho gasto producto a un error", "danger");
        })
        .always(function (res) {
        });
};

function detallesGasto(id) {
    $.ajax({
        url: "/gasto/get/" + id,
        type: "GET",
        data: {}
    })
        .done(function (res) {
            let gasto = res.gasto;
            $("#g_id").text(gasto.id);
            $("#g_causa").text(gasto.causa);
            $("#g_monto").text(gasto.precio);
            $("#d1").text(moment(gasto.turno_asociado.fecha_inicio).format("DD-MMMM-YYYY"));
            $("#d2").text(moment(gasto.turno_asociado.fecha_fin).format("DD-MMMM-YYYY"));
            $("#g_add").text(moment(gasto.createdAt).fromNow());
            $("#g_upd").text(moment(gasto.updatedAt).fromNow());


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
function chartCausaAnnos(anno) {
    $.ajax({
        url: "gasto/allCausas",
        type: "POST",
        data: {"anno":anno}
    })
        .done(function (result) {
            chart_causas(result.legend,result.data);

        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};


