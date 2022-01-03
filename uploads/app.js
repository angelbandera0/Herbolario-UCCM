var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload')
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productoRouter = require('./routes/producto');
const productoController = require('./controllers').producto;
const carritoController = require('./controllers').carrito;

var app = express();
app.io = require('socket.io')();
var passportSocketIo = require('passport.socketio');

app.use(fileUpload(
    {
        createParentPath : true
    }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'tienda',
    password: 'tienda',
    database: 'tienda_online',
    createDatabaseTable: true,
    schema: {
        tableName: 'usuario_seccion',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
 
var sessionStore = new MySQLStore(options);

app.use(session({
  //secret: 'privateallowen',
  //resave: true,
  //saveUninitialized: true
    key: 'access_info',
    secret: 'private123',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  
}))

app.io.use(passportSocketIo.authorize({
  key: 'access_info',
  secret: 'private123',
  store: sessionStore,
  passport: passport,
  cookieParser: cookieParser
}));

//Flash
var flash = require('connect-flash');
app.use(flash());
//passport
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport')(passport);

//session
//app.use(session({secret: 'abcd1234', saveUninitialized: false, resave: false}));
//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/compra', usersRouter);
app.use('/producto', productoRouter);
app.use('/seguridad', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send({error: 'Not found'})
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({error: err})
});



/*****socket.io connection*****/

var client = {};//relacion id_user <=> socket_id
app.io.on('connection', function (socket) {
    console.log('Se a conectado un host');

    //console.log(app.io.sockets.sockets);
    socket.on('login', function (data) {
        client[data]=socket.id;
        console.log("Usuario conectado con Id:",+data);
    });
    socket.on('pedir_listado', function (data) {
        let params={
            "id_user":data,
            "sockets_clients":client
        };
        productoController.cargar_listado(app.io.sockets,params);
       //app.io.sockets.emit('messages', messages);
        console.log("STATUS:","listado de productos cargado");
    });
    socket.on('cargar_carrito', function (data) {
        let params={
            "id_user":data,
            "sockets_clients":client
        };
        carritoController.list_By_Id_User(app.io.sockets,params);
        console.log("STATUS:","Carrito cargado"+data);
    });
    socket.on('add_carrito', function (data) {
        carritoController.add(app.io.sockets,data);
        console.log("STATUS:","Producto agregado exitosamente");
    });
    socket.on('remover_producto_carrito', function (data) {
        carritoController.delete(app.io.sockets,data);
        console.log("STATUS:","Producto eliminado exitosamente");
    });
    socket.on('datos_producto', function (data) {
        productoController.try(app.io.sockets,data);
        //app.io.sockets.emit('messages', messages);
    });


    socket.on('disconnect', () => {
        console.log('Se desconecto un host con usuario: ');
        //app.io.sockets.emit('actualizar_dispositivos', cant_dispositivos);
    });

});

console.log('Server running: http://localhost:3000');
module.exports = app;


