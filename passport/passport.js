var LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models').Usuario;
var bcrypt = require('bcryptjs');

module.exports = function(passport){

passport.serializeUser(function(user, done){
done(null, user);
});

passport.deserializeUser(function(obj,done){
done(null,obj);
});

passport.use(new LocalStrategy({
passReqToCallback: true

}, function(req,username,password,done){

	var user=Usuario.findAll({
	    where:{
        username:username
        },
    });


    return user.then((usuarios) => {

			                if(usuarios.length > 0){
					      		let hashedPassword = bcrypt.hashSync(password, usuarios[0].salt);
					      		if(usuarios[0].password!==hashedPassword){
					      			return done(null,false, req.flash('info','La contraseña es incorrecta. Contacte con el Adminstrador del sistema'));
					      		}else{
					      			return done (null,{
														id: usuarios[0].id,
														nombre: usuarios[0].nombre,
														apellidos: usuarios[0].apellidos,
														username: usuarios[0].username,
														email: usuarios[0].email,
														role: usuarios[0].role,
														imagen:usuarios[0].imagen
												});
					      		}

				         }
				         else{
				         	return done(null,false, req.flash('info','El usuario no existe en el sistema. Contacte con el Adminstrador del mismo'));
				         }
            })
            .catch((error) =>  {
            	console.log('Por favor verifique la conexion con la base de datos. Puede ser que el servidor este desconectado');
            	return done(null,false, req.flash('info','Error desconocido. Contacte con el Administrador del mismo.'));
            }

         );





}
))

};