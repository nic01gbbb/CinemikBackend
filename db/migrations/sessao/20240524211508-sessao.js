"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("sessao", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "usuario", key: "id" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      concluida: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      posição: {
        type: Sequelize.CHAR(100),
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
    return queryInterface.renameTable("sessao");
  },
};
