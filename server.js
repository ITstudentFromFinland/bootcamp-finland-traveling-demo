const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const trips = require("./routes/api/trips");
const todos = require("./routes/api/todos");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Yhdistetty MongoDB-tietokantaan"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/trips", trips);
app.use("/api/todos", todos);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));