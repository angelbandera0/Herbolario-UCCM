'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define('Estado', {
    causa: {
      type: DataTypes.STRING,
      defaultValue: "Registro de la planta en el sistema",      
    },
    estado:{
      type: DataTypes.STRING,
      defaultValue: "Existente",      
    },
    id_planta: DataTypes.INTEGER
  }, {});
  Estado.associate = function(models) {
    Estado.belongsTo(models.Planta, {
      foreignKey: 'id_planta',
      as: 'planta_asociada'
    });
    Estado.hasMany(models.Planta_Log, {
      foreignKey: 'id_planta',
      as: 'historialesAsociados',
    });
  };
  return Estado;
};