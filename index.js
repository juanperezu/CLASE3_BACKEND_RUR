

const express = require('express');
const path =require('path');
const morgan = require('morgan');
const app = express();

//middleware
app.use(morgan('dev')); // monitoriar las peticiones
app.use(express.json());


//routes
app.use('/api/',require('./routes/movies'));

app.set('port',4001);
app.listen(app.get('port'),()=>{
 console.log('Servidor corriendo en puerto 4001')
 
});


