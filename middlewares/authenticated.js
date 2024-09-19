'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const clave = "secreto";
exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "La cabecera no tiene auntenticación" });
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, clave);
        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: "Token vencido" });
        }
    } catch (error) {
        return res.status(404).send({ message: "token no valido" })
    }
    req.user = payload;
    next();
};