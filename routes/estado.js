var express = require("express");
var router = express.Router();
var estadoController = require("../controllers").estado;

router.put("/:id",estadoController.update);

module.exports = router;
