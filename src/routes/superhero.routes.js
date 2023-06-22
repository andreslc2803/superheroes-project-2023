const express = require("express");
const superhero_model = require("../models/superhero.model");
const routes = express.Router();


/**
 * Endpoint http:localhost:5000/
 * Crear un nuevo registro
 * ORM mongoose method: save()
 * POST
 */
routes.post("/", (req, res) => {
    const new_superhero = superhero_model(req.body);
    new_superhero
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({message: err}));
});

/**
 * Listar todos lo registros de la Base de datos
 * ORM mongoose method: find()
 * GET
 */
routes.get("/", (req, res) =>{
    superhero_model
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));
});

/**
 * Consultar un solo registro de la Base de datos, especificando el id
 * ORM mongoose method: findById({_id: ?})
 * GET(id)
 */
routes.get("/:superheroId", (req, res) =>{
    const {superheroId} = req.params;
    superhero_model
    .findById({_id: superheroId})
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));
});

/**
 * Modifica uno de los registros existentes
 * ORM mongoose method: updateOne(query, update)
 * PUT
 */
routes.put("/:superheroId", (req, res) =>{
    const {superheroId} = req.params;
    const query = {_id:superheroId};
    const update = {$set: req.body};
    superhero_model
    .updateOne(query, update)
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));
});

/**
 * Elimina uno de los registros existentes en la Base de datos
 * ORM mongoose method: deleteOne(query)
 * DELETE(id)
 */
routes.delete("/:superheroId", (req, res) =>{
    const {superheroId} = req.params;
    const query = {_id:superheroId};
    superhero_model
    .deleteOne(query)
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));
});

/**
 * Eliminar todas las coincidencias realizando una busqueda por una propiedad
 * especifica
 * ORM mongoose method: deleteMany
 */
routes.delete("/", (req, res) =>{
    const query = { superhero: { $regex: "Batman"}};
    superhero_model
    .deleteMany(query)
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));
});

/**
 * Consultar por una propiedad los registros que sean diferentes
 * ORM mongoose method: distinct
 */
routes.get("/superpowers-list/:property", (req, res) => {
    const property = req.params.property;
    superhero_model
    .distinct(property)
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));
});

/**
 * Consultar por una propiedas los ultimos 5 registros que sean distintos
 * En este ejemplo, la ruta recibe dos parámetros en la URL:
  
    property: el nombre del campo que se desea obtener los valores distintos, y 
    limit: el número máximo de documentos a retornar.
    
    La función distinct de la instancia de la colección de MongoDB se utiliza para 
    obtener los valores distintos del campo especificado en la ruta. Luego se usa 
    slice para limitar el número de valores retornados al límite especificado en la ruta.
 */
routes.get("/:property/:limit", (req, res) => {
    const property = req.params.property;
    const limit = parseInt(req.params.limit);
    superhero_model
    .distinct(property)
    .then((data) => res.json(data.slice(0, limit)))
    .catch((err) => res.json({message:err}));
});

module.exports = routes;