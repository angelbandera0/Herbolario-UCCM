var mytable;
var botones = `<div class="tabledit-toolbar btn-toolbar" style="text-align: left;">
<div class="btn-group btn-group-sm" style="float: none;">
  <button id="btn-edit" type="button" class="tabledit-edit-button btn btn-primary waves-effect waves-light active"
    style="float: none;margin: 5px;" data-toggle="modal"
          data-target="#edit-baja" onclick="editar(this)">
    <span class="icofont icofont-ui-edit"></span>
    </button>
    <button type="button" id="del" class="tabledit-delete-button btn btn-danger waves-effect waves-light"
    style="float: none;margin: 5px;" onclick="ventana(this)">
    <span class="icofont icofont-ui-delete"></span>
  </button>
  <button type="button" class="tabledit-edit-button btn btn-success waves-effect waves-light active"
    style="float: none;margin: 5px;" data-toggle="modal"
          data-target="#details_baja" onclick="detalles(this)">
    <span class="icofont icofont-ui-search"></span>
    </button>
</div>

</div>`
var produc=[];
var productores=[];
$(document).ready(function () {


    // Setup - add a text input max and min prices
    $.fn.dataTable.ext.search.push(
        function (settings, data, dataIndex) {
            var min = parseInt($('#min').val(), 10);
            var max = parseInt($('#max').val(), 10);
            var min_c = parseInt($('#min_c').val(), 10);
            var max_c = parseInt($('#max_c').val(), 10);
            //var cat = $("#cate").val();


            var cantidad = parseFloat(data[3]) || 0; // use data for the precio column
            var costo = parseFloat(data[4]) || 0; // use data for the precio column
            //var causa = data[1];

            if (f(min,max,cantidad) && f(min_c,max_c,costo)) {
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

        "ajax": "/baja/list",
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
            {"data": "producto_asociado.nombre"},
            {"data": "motivo"},
            {"data": "cantidadb"},
            {"data": "turno_asociado.fecha_inicio"},
            {"data": "turno_asociado.fecha_fin"},
            {"defaultContent": botones}
        ],
        "orderCellsTop": true,
        "order": [[5, "desc"]],
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
                .column(4)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Total over this page
            pageTotal = api
                .column(4, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(4).footer()).html(
                '$' + pageTotal + ' ( $' + total + ' total)'
            );
        },
        "createdRow": function (row, data, index) {
            //if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
            $('td', row).eq(4).addClass('text-c-blue');
            $('td', row).eq(1).attr('hidden',true);
            //}
        }


    });
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max,#min_c, #max_c').keyup(function () {
        mytable.draw();
    });

    mytable.on('order.dt search.dt',function () {
        mytable.column(0,{search:'applied',order: 'applied'}).nodes().each(function (cell,i) {
            cell.innerHTML=i+1;
        })
    }).draw();

});

function f(min, max,val) {

    return ((isNaN(min) && isNaN(max)) ||
        (isNaN(min) && val <= max) ||
        (min <= val && isNaN(max)) ||
        (min <= val && val <= max));

}