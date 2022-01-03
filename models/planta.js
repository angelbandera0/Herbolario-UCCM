'use strict';
module.exports = (sequelize, DataTypes) => {
  const Planta = sequelize.define('Planta', {
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
  Planta.associate = function(models) {
    Planta.hasMany(models.Estado, {
      foreignKey: 'id_planta',
      as: 'estados_asociados',
    });
    Planta.hasMany(models.Planta_Log, {
      foreignKey: 'id_planta',
      as: 'historial',
    });
  };
  return Planta;
};