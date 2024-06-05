"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("usuario", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: Sequelize.CHAR(255),
        allowNull: false,
      },

      email: {
        type: Sequelize.CHAR(255),
        allowNull: false,
      },
      senha: {
        type: Sequelize.CHAR(255),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.CHAR(50),
        allowNull: false,
      },
      endereço: {
        type: Sequelize.CHAR(150),
        allowNull: false,
      },
      numero: {
        type: Sequelize.CHAR(50),
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.renameTable("usuario");
  },
};
