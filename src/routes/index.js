const express = require("express");
const superhero_routes_access = require("./superhero.routes");
const routes = express.Router();

const app_routes_system = (app) => {
    app.use("/api/v1", routes);
    routes.use("/superheros", superhero_routes_access);
}

module.exports = app_routes_system;
