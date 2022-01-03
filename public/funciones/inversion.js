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
            text: "Una vez eliminada dicha inversión no se puede recuperar",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Aceptar",
            closeOnConfirm: true
        },
        function () {
            deleteCompra(id);
            noty("Compra eliminada correctamente", "success");
        }
    );
}

function editar(elemento) {
    console.log("tex:",produc);
    console.log("tex:",productores);
    loadProducts("#producto_existente_upd",produc.sort());
    loadProductores("#productor_existente_upd",productores.sort());
    let fila =
        elemento.parentElement.parentElement.parentElement.parentElement
            .childNodes;
    let id = fila[1].textContent;
    //inicio de cargar elementos al modal
    let data = {
        producto: fila[2].textContent,
        productor: fila[3].textContent,
        cantidad: fila[4].textContent,
        costo: fila[5].textContent,
        fecha_i: fila[7].textContent,
        fecha_f: fila[8].textContent
    };
    $("#producto_nuevo_upd").val(data.producto);
    $("#productor_nuevo_upd").val(data.productor);
    $("#cantidad_upd").val(data.cantidad);
    $("#costo_upd").val(data.costo);
    $("#a_ini_upd").val(data.fecha_i);
    $("#a_fin_upd").val(data.fecha_f);
    //fin de cargar elementos al modal
    $("#update-compra").attr("action", "/compra/update/" + id);
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


$("#btn-add").click((e)=>{
    console.log("tex:",produc);
    console.log("tex:",productores);
    loadProducts("#producto_existente",produc.sort());
    loadProductores("#productor_existente",productores.sort());
});
$("#producto_existente,#producto_existente_upd").change((e) => {
    if(e.target.id=="producto_existente"){
        $("#producto_nuevo").val($("#"+e.target.id).val());
    }
    else{
        $("#producto_nuevo_upd").val($("#"+e.target.id).val());
    }
});
$("#productor_existente,#productor_existente_upd").change((e) => {
    if(e.target.id=="productor_existente"){
        $("#productor_nuevo").val($("#"+e.target.id).val());
    }
    else{
        $("#productor_nuevo_upd").val($("#"+e.target.id).val());
    }
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
function loadProductores(id,productores) {
    let ele= $(id);
    if(ele[0].length!=0){
        while (ele[0].length>=1){
            //console.log(ele[0].length);
            (ele[0][0]).remove();
        }
    }
    for(let i=0;i<productores.length;i++){
        ele.append('<option>'+productores[i]+'</option>');
    };
}
function vaciarSelects() {
    productores=[];
    produc=[];
}
