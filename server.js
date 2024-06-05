require("./db/connect.js");
const routesBase = require("./routes/RoutesBase.js");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(routesBase);

const port = 3737;

app.listen(port, function () {
  console.log({ msg: "Ouvindo na porta:" + port });
});
