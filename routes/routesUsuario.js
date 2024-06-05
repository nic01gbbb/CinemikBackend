const routesUsuario = require("express").Router();
const usuarioController = require("../controllers/usuarioControllers");

routesUsuario.post("/createUsers/", usuarioController.createUser);
routesUsuario.get("/ListUsers/", usuarioController.ListUser);
routesUsuario.delete(
  "/DeleteUsers/:nome/:senha/:confirm",
  usuarioController.DeletarUsuario
);
routesUsuario.get(
  "/LoginUser/:nome/:senha/:confirm/",
  usuarioController.LoginUser
);

module.exports = routesUsuario;
