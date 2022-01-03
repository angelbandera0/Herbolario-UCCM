'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    imagen: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};