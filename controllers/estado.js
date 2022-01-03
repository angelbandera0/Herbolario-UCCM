const Estado = require("../models").Estado;
const { Sequelize, Op, Model, DataTypes } = require("sequelize");

module.exports = {
  
  update(req, res) {
    let id = req.params.id;
    let causa = req.body.causa===""?"Desconocido":req.body.causa;
    
    Estado.findByPk(id)
      .then((estado) => {        
        return estado.update({
          causa: causa,          
        });
      })      
      .then(() => {
        res.status(200).send({
          statusCode: 200,
          status: "success",
        });
      })
      .catch((error) => res.status(400).send(error));
  },

 
};
