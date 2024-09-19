const express = require('express');
const bodyParser = require('body-parser');

var app = express();


//Cargar rutas
const productoRoute = require('./routes/productos.route');
const userRoute = require('./routes/usuario.route');
//Configuración de formato JSON

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de los encabezados

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();

});

// subscripción de las rutas

app.use('/api', productoRoute);
app.use('/api', userRoute);
module.exports = app;