const express = require("express");
const api = require("./api");

const app = express();
const PORT = 4200;

app.use(express.json());
app.use("/api", api);
app.get("/", (req, res) => {
  res.send("<h1>Hello from Abhay</h1>");
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
