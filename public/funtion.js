var lista_filtro=new Array();
var aux=new Array();


function llenar_tienda(lista) {
    document.getElementById("detalles_min").remove();
    document.getElementById("detalles_max").remove();
    $("#grid-sidebar1").append(' <div class="row" id="detalles_min"></div>');
    $("#grid-sidebar2").append(' <div class="row" id="detalles_max"></div>');
    for(let i=0;i<lista.length;i++) {
        $("#detalles_min").append(' <div class="col-lg-6 col-md-6 col-xl-3">\n' +
            '                                            <div class="product-wrapper mb-30">\n' +
            '                                                <div class="product-img">\n' +
            '                                                    <a href="#">\n' +
            '                                                        <img src="/imagenes_subidas/vista_miniatura/'+lista[i].imagen+'"\n' +
            '                                                             alt="">\n' +
            '                                                    </a>\n' +
            '                                                    <div class="product-action">\n' +
            '                                                        <a class="animate-left " title="Wishlist" href="#">\n' +
            '                                                            <i class="pe-7s-like "></i>\n' +
            '                                                        </a>\n' +
            '                                                        <a class="animate-top " id_vista="'+lista[i].id+'" href="#" onclick="agregar_producto_carrito(this)" title="Add To Cart">\n' +
            '                                                            <i class="pe-7s-cart"></i>\n' +
            '                                                        </a>\n' +
            '                                                        <a class="animate-right" title="Quick View" data-toggle="modal" id_prod="'+lista[i].id+'"\n' +
            '                                                           data-target="#exampleModal" href="#" onclick="view(this)">\n' +
            '                                                            <i class="pe-7s-look"></i>\n' +
            '                                                        </a>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                                <div class="product-content">\n' +
            '                                                    <h4><a href="#">'+lista[i].nombre+'</a></h4>\n' +
            '                                                    <span>$'+lista[i].precio+'</span>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>');

        $("#detalles_max").append('<div class="col-lg-12 col-xl-6">\n' +
            '                                        <div class="product-wrapper mb-30 single-product-list product-list-right-pr mb-60">\n' +
            '                                            <div class="product-img list-img-width">\n' +
            '                                                <a href="#">\n' +
            '                                                    <img src="/imagenes_subidas/vista_miniatura/'+lista[i].imagen+'" alt="">\n' +
            '                                                </a>\n' +
            '                                                <span>hot</span>\n' +
            '                                                <div class="product-action-list-style">\n' +
            '                                                    <a class="animate-right" title="Quick View" data-toggle="modal" id_prod="'+lista[i].id+'"\n' +
            '                                                       data-target="#exampleModal" href="#" onclick="view(this)">\n' +
            '                                                        <i class="pe-7s-look"></i>\n' +
            '                                                    </a>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                            <div class="product-content-list">\n' +
            '                                                <div class="product-list-info">\n' +
            '                                                    <h4><a href="#">'+lista[i].nombre+'</a></h4>\n' +
            '                                                    <span>$'+lista[i].precio+'</span>\n' +
            '                                                    <p>'+lista[i].descripcion+'</p>\n' +
            '                                                </div>\n' +
            '                                                <div class="product-list-cart-wishlist">\n' +
            '                                                    <div class="product-list-cart">\n' +
            '                                                        <a class="btn-hover list-btn-style" href="#" id_vista="'+lista[i].id+'" onclick="agregar_producto_carrito(this)">add to cart</a>\n' +
            '                                                    </div>\n' +
            '                                                    <div class="product-list-wishlist">\n' +
            '                                                        <a class="btn-hover list-btn-wishlist" href="#">\n' +
            '                                                            <i class="pe-7s-like"></i>\n' +
            '                                                        </a>\n' +
            '                                                    </div>\n' +
            '                                                </div>\n' +
            '                                            </div>\n' +
            '                                        </div>\n' +
            '                                    </div>');
    };
    $(".total").text(listado.length);
    $(".total").val(listado.length);
    $("#founded").text(listado.length);
};
function listado_top(lista) {
for(let i=0;i<4;i++){
  console.log(lista[i]);
    $('#top').append('<div class="sidebar-top-rated mb-30">\n' +
        '                                <div class="single-top-rated">\n' +
        '                                    <div class="top-rated-img">\n' +
        '                                        <a href="#"><img src=/imagenes_subidas/vista_top/'+lista[i].imagen+' alt=""></a>\n' +
        '                                    </div>\n' +
        '                                    <div class="top-rated-text">\n' +
        '                                        <h4><a href="#">'+lista[i].nombre+'</a></h4>\n' +
        '                                        <div class="top-rated-rating">\n' +
        '                                            <ul>\n' +
        '                                                <li><i class="pe-7s-star"></i></li>\n' +
        '                                                <li><i class="pe-7s-star"></i></li>\n' +
        '                                                <li><i class="pe-7s-star"></i></li>\n' +
        '                                                <li><i class="pe-7s-star"></i></li>\n' +
        '                                                <li><i class="pe-7s-star"></i></li>\n' +
        '                                            </ul>\n' +
        '                                        </div>\n' +
        '                                        <span>$'+lista[i].precio+'</span>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>');
};
};

function agregar_producto_carrito(ctl) {
    let id=$(ctl).attr("id_vista");
    let cant=$("#cantidad").val();
    $("#cantidad").val(1);
    let info_cart=new Array();
    for(let i=0;i<listado.length;i++){
        console.log(id+" "+listado[i].id);
        if(listado[i].id==id){
            info_cart.push(listado[i]);
            info_cart.push(id_user);
            info_cart.push(cant);
            socket.emit("add_carrito",info_cart);
            //crear_prod(listado[i],cant);
        }
    }
    /*$("#contador_carrito").removeAttr("hidden");
    let cont=$("#contador_carrito").text();
    cont++;
    $("#contador_carrito").text(cont);
    $("#subtotal").text("$"+subtotal);*/

    $("#close").click(function () {
    });
    $("#close").click();
};


function filtrar() {
    let nombre=$('#search').val();
    let cat=$('#categorias').val();
    let precio=$('#amount').val().replace(" ","").replace(" ","").replace("$","").replace("$","").split("-");
    lista_filtro=new Array();
    aux=new Array();
    if(nombre!="") {
        for (prod in listado) {
            let p=listado[prod];
            if (p.nombre.toLowerCase().includes(nombre.toLowerCase())) {
                lista_filtro.push(p);
            }
        }

    }else {
        lista_filtro=listado;
    }

    if(cat!="Todos") {
        aux=lista_filtro;
        lista_filtro=new Array();
        for (prod in aux) {
            let p=aux[prod];
            if (p.tipo.toLowerCase()!= cat.toLowerCase()) {
                lista_filtro.push(p);
            }
        }
    }
    aux=lista_filtro;
    lista_filtro=new Array();
    for (prod in aux) {
        let p=aux[prod];
        console.log(p.precio);
        if (p.precio<=(precio[1]*1) && p.precio>=(precio[0]*1)) {
            lista_filtro.push(p);
        }
    }
    llenar_tienda(lista_filtro);
    $("#founded").text(lista_filtro.length);
    console.log("Listado filtrado>>",lista_filtro);
    console.log(cat);
    console.log(precio);

}


function crear_prod(prod,cant,id) {
    console.log(listado.length);
$("#carrito").before('<li id="'+id+'" class="single-product-cart">\n' +
    '                            <div class="cart-img">\n' +
    '                                <a href="#"><img src="/imagenes_subidas/vista_carrito/'+prod.imagen+'" alt=""></a>\n' +
    '                            </div>\n' +
    '                            <div class="cart-title">\n' +
    '                                <h5><a href="#"> '+prod.nombre+'</a></h5>\n' +
    '                                <h6><a href="#">'+prod.tipo+'</a></h6>\n' +
    '                                <span>$'+prod.precio+' x '+cant+'</span>\n' +
    '                            </div>\n' +
    '                            <div class="cart-delete">\n' +
    '                                <a href="#" onclick="quitar_carrito('+id+')"><i class="ti-trash"></i></a>\n' +
    '                            </div>\n' +
    '                        </li>');
};

function llenar_carrito(carrito) {
    let subtotal=0;
    if(carrito.length!=0) {
        $("#listado_carrito").remove();
        contruir_carrito();
        for (let i = 0; i < carrito.length; i++) {
            for (let j = 0; j < listado.length; j++) {
                if (carrito[i].id_producto == listado[j].id) {
                    subtotal+=(listado[j].precio*carrito[i].cantidad_compra);
                    crear_prod(listado[j], carrito[i].cantidad_compra,carrito[i].id);
                }
            }
        }
        $("#contador_carrito").removeAttr("hidden");
        $("#contador_carrito").text(carrito.length);
        $("#subtotal").text("$"+subtotal);
    }
    else{
        $("#listado_carrito").remove();
        $("#contador_carrito").attr("hidden","");
    }
};
function contruir_carrito() {
    $("#inicio_carrito").after('<ul class="cart-dropdown" id="listado_carrito">\n' +
        '\n' +
        '                        <li class="cart-space"id="carrito">\n' +
        '                            <div class="cart-sub">\n' +
        '                                <h4>Subtotal</h4>\n' +
        '                            </div>\n' +
        '                            <div class="cart-price">\n' +
        '                                <h4 id="subtotal">$00.00</h4>\n' +
        '                            </div>\n' +
        '                        </li>\n' +
        '                        <li class="cart-btn-wrapper">\n' +
        '                            <a class="cart-btn btn-hover" href="/cart">view cart</a>\n' +
        '                            <a class="cart-btn btn-hover" href="/checkout">checkout</a>\n' +
        '                        </li>\n' +
        '                    </ul>');
};
function quitar_carrito(id){
    document.getElementById(id).remove();
    socket.emit("remover_producto_carrito",id);
}
function producto_top(lista){
    let aux=lista;
    for(let i=0;i<(aux.length-1);i++){
        for(let j=i;j<(aux.length);j++){
            console.log(i+" "+ j);
            if((aux[j].precio*1)>(aux[i].precio*1)){
                let a=aux[j];
                aux[j]=aux[i];
                aux[i]=a;
            }
        }
    }
   listado_top(aux);
}





