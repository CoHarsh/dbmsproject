const express = require("express");
const cores = require("cors");


const app = express();
app.use(cores());

const indexRoutes = require("./routes/index");

// middleware
app.use(express.json())

app.use(indexRoutes);
app.use(express.urlencoded({extended: false}));

app.listen(4920, () => {
  console.log("Server running on port 4920");
});