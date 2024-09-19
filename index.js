const app = require('./app');
const mongoose = require('mongoose');
const puerto = 3001;

mongoose.connect('mongodb://localhost:27017/tecocdb')
    .then(() => {
        console.log("Conexión exitosa a la bd");
        app.listen(puerto, function (err) {
            console.log("Escuchando en el puerto" + puerto);

        });

    })
    .catch((err) => {
        console.log("Error al conectar" + err);

    })



