function generarClickAuto(obj) {
    $(obj).click(function () {
    });
    $(obj).click();
};
var ay;
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
            title: "¿Estas seguro de esta acción?",
            text: "Una vez eliminado dicho productor no se puede recuperar",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Aceptar",
            closeOnConfirm: true
        },
        function () {
            deleteProductor(id);
            noty("Productor eliminado correctamente", "success");
        }
    );
}

function editar(elemento) {
    console.log("tex:",listap);
    loadProducts("#producto_existente_upd",listap.sort());
    let fila =
        elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    let id = fila[1].textContent;
    //inicio de cargar elementos al modal
    let data = {
        producto: fila[2].textContent,
        cantidad: fila[3].textContent,
        precio: fila[4].textContent,
        fecha_i: fila[8].textContent,
        fecha_f: fila[9].textContent
    };
    console.log(data);
    productoresSegunProducto(data.producto,"#productor_existente_upd");
    $("#producto_existente_upd").val(data.producto);
    $("#cantidad_upd").val(data.cantidad);
    $("#precio_upd").val(data.precio);
    $("#a_ini_upd").val(data.fecha_i);
    $("#a_fin_upd").val(data.fecha_f);
    //fin de cargar elementos al modal
    $("#update-venta").attr("action", "/venta/update/" + id);
}

function detalles(elemento) {
    let fila =
        elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    let id = fila[1].textContent;
    ay=id;
    datosCompraP(id);
    datosPago(id);
    $("#tabla_pagos").removeAttr("hidden");
    $("#edit_p").attr("hidden","true");
    $("#delete_p").attr("hidden","true");

};

function mostrarAnnos(sel_annos) {
    for (let i = 0; i < sel_annos.length; i++) {
        $('#sel-annos').append('<option>' + sel_annos[i] + '</option>')
        $('#sel-annos-causas').append('<option>' + sel_annos[i] + '</option>')
    }
};
$("#sel-meses,#sel-annos").change(() => {
    let mes = $("#sel-meses").val();
    let anno = $("#sel-annos").val();
    let fe = moment(anno + "-" + mes + "-01");
    chartFechaMes(mes, anno, fe.format("MMMM") + " del " + anno + ":");
});
$("#agrupar,#sel-annos-causas").change(() => {
    let agrupado = $("#agrupar").val();
    let anno = $("#sel-annos-causas").val();
    $("#all-causas").remove();
    $("#aqui").append('<div id="all-causas" style="height:400px"></div>');
    chartCausaAnnos(anno, agrupado);
});
/*****Mod fechas auto add*****/
$("#a_ini").change(() => {
    let date = $("#a_ini").val();
    $("#a_fin").val(moment(date).add(1, 'days').format("YYYY-MM-DD"));
});
$("#a_fin").change(() => {
    let date = $("#a_fin").val();
    $("#a_ini").val(moment(date).subtract(1, 'days').format("YYYY-MM-DD"));
});
/*****Mod fechas auto upd*****/
$("#a_ini_upd").change(() => {
    let date = $("#a_ini_upd").val();
    $("#a_fin_upd").val(moment(date).add(1, 'days').format("YYYY-MM-DD"));
});
$("#a_fin_upd").change(() => {
    let date = $("#a_fin_upd").val();
    $("#a_ini_upd").val(moment(date).subtract(1, 'days').format("YYYY-MM-DD"));
});


function pagar(elemento){
    let fila =
        elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    $("input#productor.form-control.add").val(fila[2].textContent);
    $("input#invertido.form-control.add").val(fila[3].textContent);
    $("input#pagado.form-control.add").val(fila[4].textContent);
    $("input#deuda.form-control.add").val(fila[5].textContent);
};
function pagarEdit(elemento){
    let fila =elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    let id=fila[0].textContent;
    productorByName(fila[1].textContent,fila[2].textContent);
    $("input#cantidad_pago.form-control.edit").val(fila[2].textContent);
    $("input#a_ini_upd.form-control.edit").val(fila[3].textContent);
    $("input#a_fin_upd.form-control.edit").val(fila[4].textContent);
    $("#tabla_pagos").attr("hidden","true");
    $("#edit_p").removeAttr("hidden");
    $("#edit-pago").attr("action", "/pago/update/" + id);
};
function ventanaDel(elemento){
    let fila =
        elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    $("#tabla_pagos").attr("hidden","true");
    $("#delet").attr("onclick",'eliminarPago('+fila[0].textContent+')');
    $("#delete_p").removeAttr("hidden");

};
function cambio(attr,remove_attr) {
    $(remove_attr).removeAttr("hidden");
    $(attr).attr("hidden","true");
}
function press(e){
    let clase=(e.className.toString().includes("add"))?"add":"edit";
    let invert=$("input#invertido.form-control."+clase).val();
    let pagado=$("input#pagado.form-control."+clase).val();
    let val=$("input#cantidad_pago.form-control."+clase).val();
    (val<0)?val=0:true;
    (val>=invert-pagado)?val=invert-pagado:true;
    $("input#cantidad_pago.form-control."+clase).val(val);
    $("input#deuda.form-control."+clase).val(invert-pagado-val);
};
function eliminarPago(id) {
    deletePago(id);
}




function vaciarSelects() {
    listap=[];
}
