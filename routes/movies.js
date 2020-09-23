const{Router }= require('express');
const router = Router();
const fs= require('fs');

// Leer el archivo json de manera asíncrona, con filesystem
const  moviesFile=fs.readFileSync("./movies.json","utf-8");
let movies = JSON.parse(moviesFile);

router.get("/",(req,res)=>{

res.json("API REST CRUD POLIJIC");
});
// APLICRUD  middleware

router.get("/movies",(req,res)=>{
res.status(200).json(movies);
});
// guardar una pelicula
router.post("/movies",(req,res)=>{
// definir la captura de datos nombres campos
const{title,director,year,duration,genre,poster} =req.body;
// si titulo no es vacio  ó director no  es vacio........
if(!title || !director || !year || !duration || !genre || !poster){
   // verdadero  Ö es falso cuando todas son falsas
   res.status(401).json({error:"Debe llenar todos los datos"});
}else{
   // falso
const id =movies.length+1;
// nuevo registro de pelicual para guardar
let newMovie={
id,title,director,year,duration,genre,poster
};
movies.push(newMovie);// insertamos registro a movies
const json_movies=JSON.stringify(movies);
fs.writeFileSync("./movies.json",json_movies,"utf-8");
res
   .status(200)
   .json(movies);
}// fin si
});// fin guardar pelicula

// MOdificar un dato json recibe undato id de búsqueda
// y los datos a modificar
router.put("/movies/:id",(req,res)=>{
const { title,director,year,duration,genre,poster} =req.body;
const id=req.params.id;
if(!title|| !director||!year|| !duration || !genre || !poster || !id){
 res.status.json({error:"Debes ingresar todos los datos"});
}else{
 // buscar la pelicula que coincida con el id   
 movies.filter((movie)=>{
 if(movie.id==id) {
   // Se le asignan temporalemente los nuevos datos  
   movie.title=title;
   movie.director=director;
   movie.year=year;
   movie.duration=duration;
   movie.genre=genre;
   movie.poster=poster;
 }// fin si lo encuentra
 });// fin filter movies   
const json_movies = JSON.stringify(movies);
fs.writeFileSync("./movies.json",json_movies,"utf-8");
res.status(200).json(movies);

} // fin si
}); // fin del método put-> Actualizar
// Borrar una película
router.delete("/movie/:id",(req,res)=>{
const id=req.params.id;
if(!id){
    res
       .status(401)
       .json({error:"Debe especificar el id de la película"});
}else{
const indexMovie =movies.findIndex((movie)=>movie.id==id);
movies.splice(indexMovie,1);
 // = asignar == igual   === exactamente igual
const json_movies= JSON.stringify(movies);
fs.writeFileSync("./movies.json",json_movies,"utf-8");
res.status(200).json(movies);
}// fin si
});// fin delete


module.exports =router;
