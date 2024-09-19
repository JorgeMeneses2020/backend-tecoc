const Producto = require('../models/producto.model');
const fs = require('fs');
const path = require('path');
const productoController = {
    insertProducto: (req, res) => {
        var params = req.body;
        var files = req.files;
        var image_name = null;
        if (files) {
            // console.log(files.imagen);
            var rutaImagen = files.imagen.path;
            // console.log(rutaImagen);
            var arrayRuta = rutaImagen.split('\\');
            image_name = arrayRuta[2];
            console.log(image_name);


        }
        var producto = new Producto();
        producto.titulo = params.titulo;
        producto.descripcion = params.descripcion;
        producto.precio = params.precio;
        producto.stock = params.stock;
        producto.imagen = image_name;
        producto.idcategoria = params.idcategoria
        // console.log(producto);

        producto.save().then((productoSaved) => {

            console.log("Almacenado de forma correcta");
            if (!productoSaved) return res.status(404).send({ message: "No se guardó" });
            if (productoSaved) return res.status(200).send({ producto: productoSaved });



        }).catch((err) => {
            if (err) return res.status(500).send({ message: "Error en el servidor" + err });

        })

    },
    getProducto: (req, res) => {
        let id = req.params.id;

        Producto.findById(id).populate({ path: 'idcategoria' }).then((prod) => {
            if (!prod) return res.status(404).send({ message: "No se encontró el producto" });
            if (prod) return res.status(200).send({ producto: prod });

        }).catch(
            (err) => {
                if (err) return res.status(500).send({ message: "Error en el servidor" + err });
            }
        );


    },
    getProductoName: (req, res) => {
        let titulo = req.params.titulo;
        Producto.find({ titulo: new RegExp(titulo, 'i') }).then((prod) => {
            if (!prod) return res.status(404).send({ message: "No se encontró el producto" });
            if (prod) return res.status(200).send({ producto: prod });

        }).catch(
            (err) => {
                if (err) return res.status(500).send({ message: "Error en el servidor" + err });
            }
        );
    },
    deleteProducto: (req, res) => {
        let id = req.params.id;
        let img = req.params.img;
        if (img) {
            fs.unlink('./uploads/productos/' + img, (err) => {
                if (err) console.log(err);
            });
        }
        Producto.findByIdAndDelete(id).then((prod) => {
            if (!prod) return res.status(404).send({ message: "No se pudo borrar el producto" });
            if (prod) return res.status(200).send({ producto: prod });

        }).catch(
            (err) => {
                if (err) return res.status(500).send({ message: "Error en el servidor" + err });
            }
        );


    },
    updateProducto: (req, res) => {
        let id = req.params.id;
        let img = req.params.img;
        var data = req.body;
        let files = req.files;

        if (files) {
            if (files.imagen) {
                let rutaImagen = files.imagen.path;
                let arrayRuta = rutaImagen.split('\\');
                var image_name = arrayRuta[2];
                fs.unlink('./uploads/productos/' + img, (err) => {
                    if (err) console.log(err);
                });
                data.imagen = image_name;
            }
        }


        Producto.findByIdAndUpdate({ _id: id }, data, { new: true }).then(
            (prodUpdate) => {
                if (!prodUpdate) return res.status(404).send({ message: "El producto que deseas actualizar no existe" });
                if (prodUpdate) return res.status(200).send({ producto: prodUpdate })
            }
        ).catch(
            (error) => {
                return res.status(500).send({ message: "Error en el servidor" + error })

            }
        )


    },
    getImagen: (req, res) => {
        var img = req.params.img;
        var pathImagen = "";
        if (img) {
            pathImagen = './uploads/productos/' + img;
            res.status(200).sendFile(path.resolve(pathImagen));
        }
        else {
            res.status(200).sendFile(path.resolve("./uploads/productos/default.jpg"));

        }
    }


}


module.exports = productoController;