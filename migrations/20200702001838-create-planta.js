'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Planta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      caracterizacion: {
        type: Sequelize.TEXT
      },
      origen: {
        type: Sequelize.STRING
      },
      tipo_especie: {
        type: Sequelize.STRING
      },
      codigo: {
        type: Sequelize.STRING
      },
      reino: {
        type: Sequelize.STRING
      },
      division: {
        type: Sequelize.STRING
      },
      subdivision: {
        type: Sequelize.STRING
      },
      clase: {
        type: Sequelize.STRING
      },
      subclase: {
        type: Sequelize.STRING
      },
      orden: {
        type: Sequelize.STRING
      },
      familia: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      especie: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      utilidad: {
        type: Sequelize.STRING
      },
      cantidad: {
        type: Sequelize.INTEGER
      },
      is_endemica: {
        type: Sequelize.BOOLEAN
      },
      curiosidad: {
        type: Sequelize.TEXT
      },
      foto_planta: {
        type: Sequelize.STRING
      },
      foto_recuerdo: {
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Planta');
  }
};