'use strict';
module.exports = (sequelize, DataTypes) => {
  const Planta_Log = sequelize.define('Planta_Log', {
    id_estado: DataTypes.INTEGER,
    id_planta: DataTypes.INTEGER,
    operacion: DataTypes.STRING,
    nombre: DataTypes.STRING,
    caracterizacion: DataTypes.TEXT,
    origen: DataTypes.STRING,
    tipo_especie: DataTypes.STRING,
    codigo: DataTypes.STRING,
    reino: DataTypes.STRING,
    division: DataTypes.STRING,
    subdivision: DataTypes.STRING,
    clase: DataTypes.STRING,
    subclase: DataTypes.STRING,
    orden: DataTypes.STRING,
    familia: DataTypes.STRING,
    genero: DataTypes.STRING,
    especie: DataTypes.STRING,
    area: DataTypes.STRING,
    utilidad: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    is_endemica: DataTypes.BOOLEAN,
    curiosidad: DataTypes.TEXT,
    foto_planta: DataTypes.STRING,
    foto_recuerdo: DataTypes.STRING,
    fecha_inicio: DataTypes.DATEONLY
  }, {});
  Planta_Log.associate = function(models) {
    // associations can be defined here
    Planta_Log.belongsTo(models.Planta, {
      foreignKey: 'id_planta',
      as: 'planta_asociada'
    });
    Planta_Log.belongsTo(models.Estado, {
      foreignKey: 'id_estado',
      as: 'estadoAsociado'
    });    
  };
  return Planta_Log;
};