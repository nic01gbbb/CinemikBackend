const routesBase = require("express").Router();
const routesUsuario = require("./routesUsuario.js");
const routesSeção = require("./routesSeção.js");

routesBase.use(routesUsuario);
routesBase.use(routesSeção);
module.exports = routesBase;
