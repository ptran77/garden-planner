const express = require("express");
const path = require("path");
const routes = require("./controllers/");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3002;

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

// Setting up Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on routes
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
