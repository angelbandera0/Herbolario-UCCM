var listap = [];

function cargarProductos() {
    $.ajax({
        url: "producto/distinct",
        type: "GET",
        data: {}
    })
        .done(function (result) {
            for (let i = 0; i < result.productos.length; i++) {
                listap.push(result.productos[i].nombre);           }
            //esta condicion es para cargar los productos de las graficas de las bajas
            if($("#sel-productos").val()==null) {
                loadProducts("#sel-productos", listap.sort());
                cargarInfoAnnoMeses($("#sel-productos").val());

            }

        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};

function deleteCompra(id) {
    $.ajax({
        url: "/producto/delete/" + id,
        type: "POST",
        data: {}
    })
        .done(function (res) {
            //mytable.ajax.reload();
            inventario(false);
        })
        .fail(function (res) {
            noty("No se pudo realizar la eliminación de dicho producto por un error", "danger");
        })
        .always(function (res) {
        });
};

function productoresSegunProducto(nombre, id) {
    $.ajax({
        url: "producto/productoresByName",
        type: "POST",
        data: {"nombre": nombre}
    })
        .done(function (result) {
            loadProducts(id, result)
            //console.log(result)
        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};

function inventario(bool) {
    $.ajax({
        url: "producto/list",
        type: "GET",
        data: {}
    })
        .done(function (r) {
            let arr = [];
            r.productos.forEach((e) => {
                let flag = ""
                let v = 0,b=0,c=0;
                let obj = [null,e.id,e.nombre];
                e.compras_asociadas.forEach((com) => {
                    c += com.cantidadc;
                });
                e.ventas_asociadas.forEach((ven) => {
                    v += ven.cantidadv;
                });
                e.bajas_asociadas.forEach((baj) => {
                    b += baj.cantidadb;
                });
                (c != 0) ? flag = "disabled" : true;
                obj.push(c,v,b,c - v - b);
                obj.push(`<div class="tabledit-toolbar btn-toolbar" > <div class="btn-group align-center btn-group-sm" style="float: none;"> <button type="button" id="del" class="tabledit-delete-button btn btn-danger waves-effect waves-light" style="float: none;margin: 5px;" onclick="ventana(this)"` + flag + `> <span class="icofont icofont-ui-delete"></span> </button> <button type="button" class="tabledit-edit-button btn btn-success waves-effect waves-light active" style="float: none;margin: 5px;" data-toggle="modal" data-target="#details_producto" onclick="detalles(this)"> <span class="icofont icofont-ui-search"></span> </button> </div> </div>`)
                arr.push(obj);
               });
            if (bool) {
                ct(arr)
            } else {
                mytable.clear().rows.add(arr).draw();
            }
        })
        .fail(function (res) {

        })
        .always(function (res) {
        });

};


