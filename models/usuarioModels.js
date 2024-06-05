const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.CHAR(255),
        email: DataTypes.CHAR(255),
        senha: DataTypes.CHAR(255),
        cpf: DataTypes.CHAR(11),
        cidade: DataTypes.CHAR(150),
        endereço: DataTypes.CHAR(150),
        numero: DataTypes.CHAR(50),
      },
      { sequelize, modelName: "usuario", tableName: "usuario" }
    );
  }
  static associate(models) {
    this.hasOne(models.sessao, { as: "us", foreignKey: "usuario_id" });
  }
}
module.exports = Usuario;
