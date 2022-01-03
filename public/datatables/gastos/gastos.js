var mytable;
var botones = `<div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
<div class="btn-group btn-group-sm" style="float: none;">
  <button type="button" class="tabledit-edit-button btn btn-primary waves-effect waves-light active"
    style="float: none;margin: 5px;" data-toggle="modal"
          data-target="#edit-gasto" onclick="editar(this)">
    <span class="icofont icofont-ui-edit"></span>
    </button>
    <button type="button" id="del" class="tabledit-delete-button btn btn-danger waves-effect waves-light"
    style="float: none;margin: 5px;" onclick="ventana(this)">
    <span class="icofont icofont-ui-delete"></span>
  </button>
  <button type="button" class="tabledit-edit-button btn btn-success waves-effect waves-light active"
    style="float: none;margin: 5px;" data-toggle="modal"
          data-target="#details_gasto" onclick="detalles(this)">
    <span class="icofont icofont-ui-search"></span>
    </button>
</div>

</div>`
$(document).ready(function () {


    // Setup - add a text input max and min prices
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var min = parseInt($('#min').val(), 10);
            var max = parseInt($('#max').val(), 10);
            var cat = $("#cate").val();


            var precio = parseFloat(data[3]) || 0; // use data for the precio column
            var causa = data[2];
            //console.log(f(cat, causa));

            if (((isNaN(min) && isNaN(max)) ||
                (isNaN(min) && precio <= max) ||
                (min <= precio && isNaN(max)) ||
                (min <= precio && precio <= max)) && f(cat, causa)) {
                return true;
            }
            return false;
        }
    );
    // Setup - add a text input to each footer cell
    var search = ($('#try thead tr').clone(true));
    search.appendTo('#try thead');
    $('#try thead tr:eq(1) th').each(function (i) {

        var title = $(this).text();
        $(this).html('<input class="form-control-sm" style="width: 75%;" id="' + title + '" type="text" placeholder="Buscar ' + title + '" />');

        $('input', this).on('keyup change', function () {
            if (mytable.column(i).search() !== this.value) {
                mytable
                    .column(i)
                    .search(this.value)
                    .draw();
            }
        });

    });
    $("#Acciones").remove();//elimina el campo de busqueda de los botones q sobra
    $("#No").remove();//elimina el campo de busqueda de los id q sobra
    mytable = $('#try').DataTable({
        //"processing": true,
        //"serverSide": true,

        "ajax": "/gasto/list",
        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        "destroy": true,
        "deferRender": true,
        "deferLoading": 57,
        "stateSave": true,
        "columns": [
            {"data":null},
            {"data": "id"},
            {"data": "causa"},
            {"data": "precio"},
            {"data": "turno_asociado.fecha_inicio"},
            {"data": "turno_asociado.fecha_fin"},
            {"defaultContent": botones}
        ],
        "orderCellsTop": true,
        "order": [[4, "desc"]],
        "fixedHeader": true,
        "pagingType": "full_numbers",
        /*"initComplete": function () {
            var api = this.api();
            api.$('td').click(function () {
                console.log(this)
                if(this.childNodes[0].tagName!="DIV") {
                    api.search(this.innerHTML).draw();
                }
            });
        },*/
        "columnDefs": [
            {"searchable":false,
                "orderable":false,
                "targets":0},
            {"width": "55px", "targets": 1}
        ],

        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // Total over all pages
            total = api
                .column(3)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(3, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(3).footer()).html(
                '$' + pageTotal + ' ( $' + total + ' total)'
            );
        },
        "createdRow": function (row, data, index) {
            //if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
            console.log($('td', row).eq(3).text());
            $('td', row).eq(3).addClass('text-c-blue');
            $('td', row).eq(1).attr('hidden',true);
            //}
        }


    });
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').keyup(function () {
        mytable.draw();
    });
    $('#cate').change(function () {
        mytable.draw();
    });
    mytable.on('order.dt search.dt',function () {
        mytable.column(0,{search:'applied',order: 'applied'}).nodes().each(function (cell,i) {
            cell.innerHTML=i+1;
        })
    }).draw();

});


function f(cat, causa) {

    if (cat === "Todos") {
        return true
    } else if (cat === "Salarios" && causa.split(" ").includes("Salario")) {
        return true
    } else if (cat === "Otros" && (causa.split(" ").includes("Compra") || causa.split(" ").includes("Pago") || causa.split(" ").includes("Recarga"))) {
        return true
    } else if (cat === "Diarios" && (causa.split(" ").includes("Almuerzo") || causa.split(" ").includes("Impuesto") || causa.split(" ").includes("Montador") ||
        causa.split(" ").includes("Guagua") || causa.split(" ").includes("Viaje") || causa.split(" ").includes("Custodio") || causa.split(" ").includes("Merienda"))) {
        return true
    }

    return false;

}