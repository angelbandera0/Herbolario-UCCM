function generarClickAuto(obj) {
    $(obj).click(function () {
    });
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
            title: "¿Estas seguro de esta acción?",
            text: "Una vez eliminada dicha baja no se puede recuperar",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Aceptar",
            closeOnConfirm: true
        },
        function () {
            deleteCompra(id);
            noty("Baja eliminada correctamente", "success");
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
        cantidad: fila[4].textContent,
        motivo: fila[3].textContent,
        fecha_i: fila[5].textContent,
        fecha_f: fila[6].textContent
    };
    $("#producto_existente_upd").val(data.producto);
    $("#cantidad_upd").val(data.cantidad);
    $("#motivo_upd").val(data.motivo);
    $("#a_ini_upd").val(data.fecha_i);
    $("#a_fin_upd").val(data.fecha_f);
    //fin de cargar elementos al modal
    $("#update-baja").attr("action", "/baja/update/" + id);
}

function detalles(elemento) {
    let fila =
        elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    let id = fila[1].textContent;
    detallesCompra(id);
};

function mostrarAnnos(sel_annos) {
    for (let i = 0; i < sel_annos.length; i++) {
        $('#sel-annos').append('<option>' + sel_annos[i] + '</option>');
        $('#sel-annos2').append('<option>' + sel_annos[i] + '</option>');
        $('#sel-annos-causas').append('<option>' + sel_annos[i] + '</option>');
    }
    $("#sel-annos").val(parseInt(moment().format("YYYY"), 10));
    $("#sel-annos2").val(parseInt(moment().format("YYYY"), 10));
    $("#sel-annos-causas").val(parseInt(moment().format("YYYY"), 10));

};
$("#sel-meses,#sel-annos").change(() => {
    let mes = $("#sel-meses").val();
    let anno = $("#sel-annos").val();
    let fe = moment(anno + "-" + mes + "-01");
    echarts.dispose(document.getElementById('all-months'));
    chartFechaMes(mes, anno, fe.format("MMMM") + " del " + anno + ":");
});
$("#sel-meses2,#sel-annos2").change(() => {
    let mes = $("#sel-meses2").val();
    let anno = $("#sel-annos2").val();
    let fe = moment(anno + "-" + mes + "-01");
    echarts.dispose(document.getElementById('all-motivs'));
    chartMotivoFechaMes(mes, anno, fe.format("MMMM") + " del " + anno + ":");
});
$("#sel-productos").change(() => {
    let producto = $("#sel-productos").val();
    echarts.dispose(document.getElementById('all-years'));
    cargarInfoAnnoMeses(producto);
    });
$("#agrupar,#sel-annos-causas").change(() => {
    let agrupado = $("#agrupar").val();
    let anno = $("#sel-annos-causas").val();
    echarts.dispose(document.getElementById('all-productos'));
    chartProductoAnnos(anno, agrupado);
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


$("#btn-add").click((e)=>{
    console.log("tex:",listap);
    //console.log("tex:",productores);
    loadProducts("#producto_existente",listap.sort());

});

function loadProducts(id,productos) {
    let ele= $(id);
    if(ele[0].length!=0){
        while (ele[0].length>=1){
            //console.log(ele[0].length);
            (ele[0][0]).remove();
        }
    }
    for(let i=0;i<productos.length;i++){
        ele.append('<option>'+productos[i]+'</option>');
    };
}


function vaciarSelects() {
    listap=[];
}
