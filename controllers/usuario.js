const Usuario = require("../models").Usuario;
var Jimp = require("jimp");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey123456herbolario";

module.exports = {
  list(req, res) {
    if (req.session.userName) {
      let user = Usuario.findAll({});

      return user.then(function (usuarios) {
        res.render("gestionarUsuarios", {
          title: "gestionarUsuarios",
          listadoUsuarios: usuarios,
          userNameProfile: req.session.userName,
          userEmailProfile: req.session.email,
          userIdProfile: req.session.idUser,
          cantContSinAprob: req.session.contratosSinA,
          role: req.session.role,
          /*mostarVentana: 'false',
                        error: new Array()*/
        });
      });
    } else {
      res.redirect("/");
    }
  },

  getByUserName(req, res) {
    let user = Usuario.findAll({
      where: {
        username: req.body.username,
      },
    });

    return user
      .then((usuarios) => {
        let hashedPassword = bcrypt.hashSync(
          req.body.password,
          usuarios[0].salt
        );
        if (usuarios.length == 0) {
          res.render("login", {
            title: "Iniciar Sesión",
            error: "true",
            mensaje: 'Usuario "' + req.body.username + '" no encontrado.',
          });
        } else if (usuarios[0].password !== hashedPassword) {
          res.render("login", {
            title: "Iniciar Sesión",
            error: "true",
            mensaje: "Contraseña incorrecta.",
          });
        } else {
          let contr = Contrato.findAll({
            where: {
              estado: "No aprobado",
            },
          });

          return contr.then(function (contratos) {
            req.session.nombre = usuarios[0].nombre;
            req.session.apellidos = usuarios[0].apellidos;
            req.session.userName = req.body.username;
            req.session.idUser = usuarios[0].id;
            req.session.email = usuarios[0].email;
            req.session.createdDate = usuarios[0].createdAt;
            req.session.updateDate = usuarios[0].updatedAt;
            req.session.contratosSinA = contratos.length;
            req.session.role = usuarios[0].role;

            return res.redirect("/dashboard");
          });
        }
      })
      .catch((error) => {
        res.render("login", {
          title: "Iniciar Sesión",
          error: "true",
          mensaje: 'Usuario "' + req.body.username + '" no encontrado.',
        });
      });
  },
  connect(req, res) {
    req.app.io.sockets.emit("try", "Se ha conectado un usuario");
    res.render("index");
  },

  register(req, res) {
    let saltUser = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, saltUser);

    let newUser = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
      imagen: "nophoto.jpg",
      salt: saltUser,
    };
    return Usuario.create(newUser)
      .then((user) => {
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.dataValues.id }, SECRET_KEY, {
          expiresIn: expiresIn,
        });
        let dataUser = {
          id: user.dataValues.id,
          nombre: user.dataValues.nombre,
          apellidos: user.dataValues.apellidos,
          username: user.dataValues.username,
          email: user.dataValues.email,
          role: user.dataValues.role,
          imagen: user.dataValues.imagen,
          accessToken: accessToken,
          expiresIn: expiresIn,
        };
        res.status(201).send({ message: "Acceso", dataUser });
      })
      .catch((error) => res.status(400).send(error));

    // });
  },
  login(req, res) {
    return Usuario.findOne({ where: { username: req.body.username } })
      .then((user) => {
        //console.log(user);
        if (!user) {
          res
            .status(400)
            .send({
              auth: false,
              dataUser: null,
              message: "El usuario no exite en la base de datos",
            });
        } else {
          if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign(
              { id: user.dataValues.id },
              SECRET_KEY,
              {
                expiresIn: expiresIn,
              }
            );
            let dataUser = {
              id: user.dataValues.id,
              nombre: user.dataValues.nombre,
              apellidos: user.dataValues.apellidos,
              username: user.dataValues.username,
              email: user.dataValues.email,
              role: user.dataValues.role,
              imagen: user.dataValues.imagen,
            };
            let token = { accessToken: accessToken, expiresIn: expiresIn };
            res
              .status(200)
              .send({ auth: true, accessToken: accessToken, message: "Acceso", dataUser:dataUser });
          } else {
            res
              .status(400)
              .send({
                auth: false,
                dataUser: null,
                message: "Contraseña incorrecta",
              });
          }
        }
      })
      .catch((error) => res.status(400).send(error));

    // });
  },

  dato(req, res) {
    let user = Usuario.findById(req.params.id, {});

    return user.then(function (usuarios) {
      res.render("usuarioPerfilView", {
        title: "Informacion Usuario",
        infoUser: usuarios,
        userNameProfile: req.session.userName,
        userEmailProfile: req.session.email,
        userIdProfile: req.session.idUser,
        cantContSinAprob: req.session.contratosSinA,
        role: req.session.role,
      });
    });
  },
};

/*****
 * Se encarga de colocar una foto en la carpeta
 *  q le corresponde segun las medidas
 *  y la ruta especificada
 *  *****/
function colocar_foto_carpeta(path_in, x, y, path_out) {
  // open a file called "lenna.png"
  Jimp.read(path_in, (err, imagen) => {
    if (err) throw err;
    imagen
      .resize(x, y) // resize
      .write(path_out); // save
  });
}
