const routesSeção = require("express").Router();
const secaoController = require("../controllers/seçãoController");

routesSeção.post("/createsecao", secaoController.createSeção);
routesSeção.get("/Listcoluna1", secaoController.Listcoluna1);
routesSeção.get("/Listsessaoid/:posicao", secaoController.Listsessaoforid);
routesSeção.get("/Bc", secaoController.BuscaConcluida);
routesSeção.get(
  "/Vs/:nome/:senha/:confirm",
  secaoController.VerificarUsuarionaSala
);

module.exports = routesSeção;
