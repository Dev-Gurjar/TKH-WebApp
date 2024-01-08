require("dotenv").config();
const express = require("express");
const app = express();
const ConnectDB = require("./utils/db");
const routes = require("./routers/routes");
const xhomeroute = require("./routers/x-Home");
const xcatatoryroute = require("./routers/x-Catagories");

app.use(express.json());

app.use("/", routes);
app.use("/", xhomeroute);
app.use("/", xcatatoryroute);

PORT = 3000;
const localIpAddress = "172.31.47.98";
ConnectDB().then(() => {
  app.listen(PORT, localIpAddress, () => {
    console.log(`Server has Started at ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.send("Chal jayega bhai");
});
