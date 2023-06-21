const { Console } = require("console");
const express = require("express");
const mongoClient = require("mongoose");
const routes_system = require("./src/routes")
const app = express();
require("dotenv").config();

app.listen(process.env.PORT_PC, ()=>
    console.log(`Connect on the PORT_PC ${process.env.PORT_PC}`)
);

mongoClient.set("strictQuery", false);

mongoClient.
    connect(process.env.STRING_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> console.log("Success connection")).
    catch((err)=> console.log(err));

app.use(express.json());
routes_system(app);

// app.post('/', (req, res) => {

//     const {superhero, universe, superpowers} = req.body;

//     // const superhero = req.body.superhero;
//     // const universe = req.body.universe;
//     // const superpowers = req.body.superpowers;
// });