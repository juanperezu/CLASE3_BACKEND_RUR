const{Router }= require('express');
const router = Router();
const fs= require('fs');

// Leer el archivo json de manera asíncrona, con filesystem
const  moviesFile=fs.readFileSync("./persona.json","utf-8");
let movies = JSON.parse(moviesFile);

router.get("/",(req,res)=>{

res.json("API REST CRUD PERSONA");
});



module.exports =router;