var mytable;
var productotable;
var li;
var produc=[];
var productores=[];
var compratable;
var ventatable;
var bajatable;
var pagotable;
$(document).ready(function () {
    compratable =$('#compradoss').DataTable({
        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        //scrollY: '50vh',
        scrollCollapse: true,
        //paging: false,
        searching:false,
        //lengthChange:false,
        info:false,

    });
    ventatable =$('#vendidos').DataTable({
        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        //scrollY: '50vh',
        scrollCollapse: true,
        //paging: false,
        searching:false,
        //lengthChange:false,
        info:false,

    });
    bajatable =$('#bajass').DataTable({
        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        //scrollY: '50vh',
        scrollCollapse: true,
        //paging: false,
        searching:false,
        //lengthChange:false,
        info:false,
    });
    pagotable =$('#pago_efectuados').DataTable({
        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        //scrollY: '50vh',
        scrollCollapse: true,
        //paging: false,
        searching:false,
        //lengthChange:false,
        info:false,
    });
});
function ct(ds) {
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

        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        "destroy": true,
        "deferRender": true,
        "deferLoading": 57,
        "stateSave": true,
        data: ds,
        columns: [
            { title: "No" },
            { title: "Id" },
            { title: "Nombre" },
            { title: "Invertido" },
            { title: "Pagado" },
            { title: "Deuda" },
            { title: "Acciones" }
        ],
        "orderCellsTop": true,
        "order": [[1, "asc"]],
        "fixedHeader": true,
        "pagingType": "full_numbers",
        "columnDefs": [
            {"searchable":false,
                "orderable":false,
                "targets":0},
            {"width": "55px", "targets": 1},
            {"width": "20px", "targets": 6}
        ],
        /*"initComplete": function () {
            var api = this.api();
            api.$('td').click(function () {
                console.log(this)
                if(this.childNodes[0].tagName!="DIV") {
                    api.search(this.innerHTML).draw();
                }
            });
        },*/


        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "createdRow": function (row, data, index) {
            //if ( data[5].replace(/[\$,]/g, '') * 1 > 150000 ) {
        $('td', row).eq(4).addClass('text-info');
            let col=$('td', row).eq(5);
            col[0].textContent=Math.ceil(col[0].textContent);
            (col[0].textContent!=0)?col.addClass('text-danger'):col.addClass('text-info');
            //$('td', row).eq(1).attr('hidden',true);
            //}
        }


    });

    console.log();
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max,#min_c, #max_c').keyup(function () {
        mytable.draw();
    });

    mytable.on('order.dt search.dt',function () {
        mytable.column(0,{search:'applied',order: 'applied'}).nodes().each(function (cell,i) {
            cell.innerHTML=i+1;
        })
    }).draw();
   // mytable.ajax.reload();

};

function f(min, max,val) {
    return ((isNaN(min) && isNaN(max)) ||
        (isNaN(min) && val <= max) ||
        (min <= val && isNaN(max)) ||
        (min <= val && val <= max));
};

function cp(data) {
    console.log("cvbnm,",data)
    productotable = $('#comprados').DataTable({

        "language": {
            "url": "internaciolanizacion/dataTables/Spanish.json"
        },
        "destroy": true,
        "deferRender": true,
        "deferLoading": 57,
        "stateSave": true,
        data: data,
        columns: [
            { title: "No" },
            { title: "Id" },
            { title: "Nombre" },
            { title: "Comprados" },
            { title: "Vendidos" },
            { title: "Bajas" },

        ],
        "orderCellsTop": true,
        //"order": [[8, "desc"]],
        "fixedHeader": true,
        "pagingType": "full_numbers",


    });
};