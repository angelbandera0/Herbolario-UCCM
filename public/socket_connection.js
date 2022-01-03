var socket = io();

/*socket.on('messages', function(data) {
	console.log(data);
});*/

function render(data) {
	
	var html = data.map(function(elem, index){
    	return(`<div>
        		 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) {
	//alert(data);
	console.log(data);
	render(data);
});
socket.on('update-cart', function(data) {
	//alert(data);
	console.log(data);
	$("#carrito").text(data);
});






function addMessage(e) {
	var mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', mensaje);
  return false;
}
function addToCart() {
	
var car=$("#carrito").text();
//alert(car);
  socket.emit("add-cart", car);
  return false;
}
