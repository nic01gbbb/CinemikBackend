require("process");

const usuarioModels = require("../models/usuarioModels.js");
const seçãoModels = require("../models/seçãoModels.js");

const Sequelize = require("sequelize");

//Coloque o nome de eu banco de dados,seu username e password//

const connect = new Sequelize("database", "username", "password", {
  host: "",
  dialect: "mysql",
  define: {
    timestamps: true,
    underscored: true,
  },
});

usuarioModels.init(connect);
seçãoModels.init(connect);
seçãoModels.associate(connect.models);
usuarioModels.associate(connect.models);

module.exports = connect;
