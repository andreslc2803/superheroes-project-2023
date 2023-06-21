const express = require("express");
const superhero_model = require("../models/superhero.model");
const routes = express.Router();

/**
 * Crear un nuevo registro
 * ORM mongoose method: save()
 * http:localhost:5000/
 */
routes.post("/", (req, res) => {
    const new_superhero = superhero_model(req.body);
    new_superhero.save().then((data) => res.json(data)).catch((err) => res.json({message: err}));
});

module.exports = routes;