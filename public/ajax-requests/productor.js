function cargarProductores(e) {
  $.ajax({
    url: "productor/distinct",
    type: "GET",
    data: {},
  })
    .done(function (result) {
      let ele =
        e == "btn-add"
          ? $("#productor_existente")
          : $("#productor_existente_upd");
      if (ele[0].length != 0) {
        while (ele[0].length >= 1) {
          //console.log(ele[0].length);
          ele[0][0].remove();
        }
      }
      for (let i = 0; i < result.productores.length; i++) {
        ele.append("<option>" + result.productores[i].nombre + "</option>");
      }
    })
    .fail(function (res) {})
    .always(function (res) {});
}

function productor_listado(bool) {
  $.ajax({
    url: "productor/list",
    type: "GET",
    data: {},
  })
    .done(function (r) {
      let arr = [];
      r.productores.forEach((e) => {
        let flag = "";
        let flag1 = "";
        let p = 0,
          c = 0;
        let obj = [null, e.id, e.nombre];
        e.compras_asociadas.forEach((com) => {
          c += com.cantidadc*com.costo;
        });
        e.pagos_asociados.forEach((pag) => {
          p += pag.pago;
        });
        c != 0 ? (flag = "disabled") : true;
        c-p == 0 ? (flag1 = "disabled") : true;
        obj.push(c, p, c - p);
        console.log(obj);
        obj.push(
          `<div class="tabledit-toolbar btn-toolbar" > 
          <div class="btn-group align-center btn-group-sm" style="float: none;"> 
          <button type="button" id="btn-add" class="tabledit-edit-button btn btn-primary waves-effect waves-light active" style="float: none;margin: 5px;" data-toggle="modal" data-target="#add_pago" onclick="pagar(this)"` + flag1 +`> 
          <span class="icofont icofont-plus"></span> 
          </button> 
          <button type="button" id="del" class="tabledit-delete-button btn btn-danger waves-effect waves-light" style="float: none;margin: 5px;" onclick="ventana(this)"` + flag +`> 
          <span class="icofont icofont-ui-delete"></span> </button> 
            <button type="button" class="tabledit-edit-button btn btn-success waves-effect waves-light active" style="float: none;margin: 5px;" data-toggle="modal" data-target="#details_productor" onclick="detalles(this)"> 
            <span class="icofont icofont-ui-search"></span> 
            </button>
            
            </div> 
            </div>`
        );
        arr.push(obj);
      });
      if (bool) {
        ct(arr);
      } else {
        mytable.clear().rows.add(arr).draw();
      }
    })
    .fail(function (res) {})
    .always(function (res) {});
};
function deleteProductor(id) {
    $.ajax({
        url: "/productor/delete/" + id,
        type: "POST",
        data: {}
    })
        .done(function (res) {
            productor_listado(false);
        })
        .fail(function (res) {
            noty("No se pudo realizar la eliminación de dicho productor por un error", "danger");
        })
        .always(function (res) {
        });
};
function productorByName(name,val) {
    $.ajax({
        url: "/productor/productorByName",
        type: "POST",
        data: {"nombre":name}
    })
        .done(function (res) {
                let p = 0,c = 0;
            res.productor.compras_asociadas.forEach((com) => {
                    c += com.cantidadc*com.costo;
                });
            res.productor.pagos_asociados.forEach((pag) => {
                    p += pag.pago;
                });
            $("input#productor.form-control.edit").val(res.productor.nombre);
            $("input#invertido.form-control.edit").val(c);
            $("input#pagado.form-control.edit").val(p-val);
            $("input#deuda.form-control.edit").val(c-p);
            console.log(c,p);
        })
        .fail(function (res) {
            //noty("No se pudo realizar la eliminación de dicho productor por un error", "danger");
        })
        .always(function (res) {
        });
};
