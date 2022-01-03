const Planta = require("../models").Planta;
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = {
  verifyNombre(req, res, next) {
    let planta_data = JSON.parse(req.body.planta);
    if (planta_data.nombre === "")
      return res.status(403).send({
        auth: false,
        message: "La planta debe poseer un nombre obligatotiamente.",
      });
    Planta.findOne({ where: { nombre: planta_data.nombre } })
      .then((p) => {
        if (!p) {
          next();
        } else {
          return res.status(403).send({
            auth: false,
            message: "Ya existe una planta con este nombre.",
          });
        }
      })
      .catch((error) => res.status(400).send(error));
  },
  verifyCodigo(req, res, next) {
    let planta_data = JSON.parse(req.body.planta);
    if (planta_data.codigo === "")
      return res.status(403).send({
        auth: false,
        message: "La planta debe poseer un código obligatotiamente.",
      });
    Planta.findOne({ where: { codigo: planta_data.codigo } })
      .then((p) => {
        if (!p) {
          next();
        } else {
          return res.status(403).send({
            auth: false,
            message: "Ya existe una planta con este código.",
          });
        }
      })
      .catch((error) => res.status(400).send(error));
  },
  verifyDataUpdateCodigo(req, res, next) {
    let planta_data = JSON.parse(req.body.planta);
    let id = req.params.id;
    Planta.findOne({
      where:{
        codigo: planta_data.codigo,
        id:{
          [Op.ne]:id
        }}
    }).then((p) => {
      if (!p) {
        next();
      } else {
        return res.status(403).send({
          auth: false,
          message: "Ya existe una planta q posee este código.",
        });
      }
    })
    .catch((error) => res.status(400).send(error));
  },
  verifyDataUpdateNombre(req, res, next) {
    let planta_data = JSON.parse(req.body.planta);
    let id = req.params.id;
    Planta.findOne({
      where:{
        nombre: planta_data.nombre,
        id:{
          [Op.ne]:id
        }}
    }).then((p) => {
      if (!p) {
        next();
      } else {
        return res.status(403).send({
          auth: false,
          message: "Ya existe una planta q posee este nombre.",
        });
      }
    })
    .catch((error) => res.status(400).send(error));
  },
};
