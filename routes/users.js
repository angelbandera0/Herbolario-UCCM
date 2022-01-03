var express = require('express');
var router = express.Router();
const usuarioController = require('../controllers').usuario;
const verifyUserMiddleware= require('../middleware/verificarUsuario');

/* GET users listing. */


router.post('/register',[verifyUserMiddleware.verifyEmail,verifyUserMiddleware.verifyUsername], usuarioController.register);
router.post('/login', usuarioController.login);

module.exports = router;
