const Usuario = require("../models").Usuario;

module.exports = {
  verifyEmail(req, res, next) {
    Usuario.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (!user) {
          next();
        }else{
        return res
          .status(403)
          .send({ auth: false, message: "Este correo ya está siendo usado." });
        }
      })
      .catch((error) => res.status(400).send(error));
  },
  verifyUsername(req, res, next) {
    Usuario.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          next();
        }else{
        return res
          .status(403)
          .send({ auth: false, message: "El nombre de usuario ya está siendo usado." });
        }
      })
      .catch((error) => res.status(400).send(error));
  },
  verifyFieldNull(req,res,next){
    console.log(req.body);
    next();
  }
};
