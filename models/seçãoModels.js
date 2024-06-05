const { Model, DataTypes } = require("sequelize");

class Sessão extends Model {
  static init(sequelize) {
    super.init(
      {
        posição: DataTypes.CHAR(100),
        concluida: DataTypes.BOOLEAN,
        usuario_id: DataTypes.INTEGER,
      },
      { sequelize, modelName: "sessao", tableName: "sessao" }
    );
  }
  static associate(models) {
    this.belongsTo(models.usuario, { as: "us", foreignKey: "usuario_id" });
  }
}
module.exports = Sessão;
