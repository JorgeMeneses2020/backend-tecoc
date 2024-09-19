'use strict'

const Categoria = require('../models/category.model');

const categoryController = {
    insertCategory: (req, res) => {
        const body = req.body;
        console.log(req.user);

        var category = new Categoria({
            categoria: body.categoria,
            descripcion: body.descripcion
        });
        category.save().then(
            (categoria) => {
                if (!categoria) return res.status(404).send({ message: "No se pudo guardar" });
                if (categoria) return res.status(200).send({ categoria: categoria });
            }
        ).catch(
            (err) => {
                res.status(500).send({ message: "error en el servidor" + err })
            }
        )
    }
}

module.exports = categoryController